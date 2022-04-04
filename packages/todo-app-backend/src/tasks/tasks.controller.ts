import { NextFunction, Request, Response } from 'express';
import { Db, ObjectId } from 'mongodb';
import { ErrorList, ErrorMsgs } from '../errors/errors-list';
import { GeneralError } from '../errors/general-error';

const COL_NAME = 'tasks';

/**
 * Create a task from body into DDBB
 */
export const createTaskCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db: Db = req.app.locals.db;
        const insertedItem = await db.collection(COL_NAME).insertOne(req.body);
        res.status(201).json({ _id: insertedItem.insertedId, ...req.body });
    } catch (err) {
        next(err);
    }
};


export const retrieveAllTaksCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db: Db = req.app.locals.db;
        const tasks = await db.collection(COL_NAME).find().toArray();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const retrieveTaskByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db: Db = req.app.locals.db;
        const id = new ObjectId(req.params.id);
        const task = await db.collection(COL_NAME).findOne({ _id: id });
        if (task === null) throw new GeneralError(404, ErrorList.NOT_FOUND, ErrorMsgs.NOT_FOUND);
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }

};

export const updateTaskByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db: Db = req.app.locals.db;
        const id = new ObjectId(req.params.id);
        const updateDocument = { $set: req.body };
        const r = await db.collection(COL_NAME).updateOne({ _id: id }, updateDocument);
        if (r.modifiedCount === 0) throw new GeneralError(404, ErrorList.NOT_FOUND, ErrorMsgs.NOT_FOUND);
        res.status(204).json({});
    } catch (err) {
        next(err);
    }
};

export const deleteTaskByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db: Db = req.app.locals.db;
        const id = new ObjectId(req.params.id);
        const r = await db.collection(COL_NAME).deleteOne({ _id: id });
        if (r.deletedCount === 0) throw new GeneralError(404, ErrorList.NOT_FOUND, ErrorMsgs.NOT_FOUND);
        res.status(204).json({});
    } catch (err) {
        next(err);
    }
};