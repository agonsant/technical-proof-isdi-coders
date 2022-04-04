import { MongoClientInstance } from './mongo-client-instance';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mongoURL: string = (global as any).__MONGO_URI__;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbName: string = (global as any).__MONGO_DB_NAME__;

test('Given a mongo db url and a database name MongoClient creates a db instance that allows operate with BBDD', async () => {
    // given 

    // when 
    const mongo = await MongoClientInstance.getInstance(mongoURL, dbName);
    // then 
    expect(mongo?.db).toBeDefined();
    expect(mongo?.client).toBeDefined();
});

test('Given a db instance when inserting a value in a collection, then it can be retrieved', async () => {
    // given 
    const mongo = await MongoClientInstance.getInstance(mongoURL, dbName);
    // when 
    const users = mongo?.db?.collection('users');
    const mockUser = { name: 'DEMO', surname: 'OTHER' };
    await users?.insertOne(mockUser);
    // then 
    const insertedUser = await users?.findOne({ name: 'DEMO' });
    expect(insertedUser).not.toBeNull();
    expect(insertedUser).toEqual(mockUser);
    const nonExistingUser = await users?.findOne({ name: 'NOT' });
    expect(nonExistingUser).toBeNull();
});

test('Given a MongoClient when an instance is requested again, it must use the same client and db', async () => {
    // given 
    const givenClient = await MongoClientInstance.getInstance(mongoURL, dbName);
    // when 
    const newClient = await MongoClientInstance.getInstance(mongoURL, dbName);
    // then 
    expect(givenClient?.db).toEqual(newClient?.db);
    expect(givenClient?.client).toEqual(newClient?.client);
});

test('Given a MongoClient when no url or dbName valid, it must return null', async () => {
    // given
    // when
    const mongo = await MongoClientInstance.getInstance('error', '');
    // then
    expect(mongo).toBe(null);
});

afterEach(async () => {
    // close opened connections
    const mongo = await MongoClientInstance.getInstance(mongoURL, dbName);
    mongo?.client?.close();
    MongoClientInstance.cleanInstance();
});