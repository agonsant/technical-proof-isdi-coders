import request from 'supertest';
import app from '../app';
import { MongoClientInstance } from '../database/mongo-client-instance';
import { ErrorList, ErrorMsgs } from '../errors/errors-list';
import { Task } from './tasks.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mongoURL: string = (global as any).__MONGO_URI__;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbName: string = (global as any).__MONGO_DB_NAME__;

beforeAll(async () => {
    const i = await MongoClientInstance.getInstance(mongoURL, dbName);
    app.locals.db = i?.db;
});

test('Tasks. Given Get All task endpoint, When task are empty then it should return empty array', done => {
    request(app)
        .get('/tasks')
        .expect('Content-Type', /json/)
        .expect([])
        .expect(200, done);

});

test('Tasks. Given Post tasks endpoint, When client post a task, it must create the task and return', async () => {
    const task: Task = {
        name: 'Demo Task',
        description: 'Demo description'
    };
    const r = await request(app)
        .post('/tasks')
        .send(task);
    expect(r.headers['content-type']).toMatch(/json/);
    expect(r.status).toEqual(201);
    expect(r.body.name).toEqual('Demo Task');
    expect(r.body._id).toBeDefined();

});

test('Given a task into the DDBB, When request by id, it must return the task', async () => {
    // given
    const task: Task = {
        name: 'Other Demo',
        description: 'Other Demo description'
    };
    const resCreate = await request(app)
        .post('/tasks')
        .send(task);
    // when
    const r = await request(app).get(`/tasks/${resCreate.body._id}`);
    //then
    expect(r.headers['content-type']).toMatch(/json/);
    expect(r.status).toEqual(200);
    expect(r.body.name).toEqual('Other Demo');
    expect(r.body.description).toEqual('Other Demo description');
    expect(r.body._id).toBeDefined();
});

test('Given a task into the DDBB, When request delete by id, it must return 204', async () => {
    // given
    const task: Task = {
        name: 'Delete Demo',
        description: 'Other Demo description'
    };
    const resCreate = await request(app)
        .post('/tasks')
        .send(task);
    // when
    const r = await request(app).delete(`/tasks/${resCreate.body._id}`);
    // then
    expect(r.status).toEqual(204);
    const rGet = await request(app).get(`/tasks/${resCreate.body._id}`);
    expect(rGet.status).toEqual(404);
    expect(rGet.body.code).toEqual(ErrorList.NOT_FOUND);
    expect(rGet.body.msg).toEqual(ErrorMsgs.NOT_FOUND);
});

test('Given a task into the DDBB, When request partial update by id, it must return 204 and the task must be updated', async () => {
    // given
    const task: Task = {
        name: 'Update Demo',
        description: 'Other Demo description'
    };
    const resCreate = await request(app)
        .post('/tasks')
        .send(task);
    // when
    const r = await request(app)
        .patch(`/tasks/${resCreate.body._id}`)
        .send({ description: 'Updated description' });
    // then
    expect(r.status).toEqual(204);
    const rGet = await request(app).get(`/tasks/${resCreate.body._id}`);
    expect(rGet.body.description).toEqual('Updated description');
});


test('Given a task DDBB, When request partial update by id and it does not exist, it must return 404', async () => {
    // given
    // when
    const r = await request(app)
        .patch('/tasks/123456789123')
        .send({ description: 'Updated description' });
    // then
    expect(r.status).toEqual(404);
    expect(r.body.code).toEqual(ErrorList.NOT_FOUND);
    expect(r.body.msg).toEqual(ErrorMsgs.NOT_FOUND);
});

test('Given a task DDBB, When request delete by id and it does not exist, it must return 404', async () => {
    // given
    // when
    const r = await request(app).delete('/tasks/123456789123');
    // then
    expect(r.status).toEqual(404);
    expect(r.body.code).toEqual(ErrorList.NOT_FOUND);
    expect(r.body.msg).toEqual(ErrorMsgs.NOT_FOUND);
});

afterAll(async () => {
    // close opened connections
    const mongo = await MongoClientInstance.getInstance(mongoURL, dbName);
    mongo?.client?.close();
    MongoClientInstance.cleanInstance();
});