import express from 'express';
import { createTaskCtrl, deleteTaskByIdCtrl, retrieveAllTaksCtrl, retrieveTaskByIdCtrl, updateTaskByIdCtrl } from './tasks.controller';

const router = express.Router();

router.route('/')
    .post(createTaskCtrl)
    .get(retrieveAllTaksCtrl);

router.route('/:id')
    .get(retrieveTaskByIdCtrl)
    .patch(updateTaskByIdCtrl)
    .delete(deleteTaskByIdCtrl);

export default router;