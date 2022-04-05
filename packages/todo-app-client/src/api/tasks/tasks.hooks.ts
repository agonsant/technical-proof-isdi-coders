import { useEffect, useState } from 'react';
import {
  createTask as createTaskAPI,
  deleteTaskById,
  retrieveAllTasks,
  retrieveTaskById,
  updateTaskById,
} from './tasks.api';
import { BaseTask, TaskResponse, TasksHook } from './tasks.model';

/**
 * Custom hook for tasks management
 * @param initialTasks the initial value for the tasks
 */
export const useTasks = (initialTasks: TaskResponse[] = []): TasksHook => {
  const [tasks, updateTasks] = useState(initialTasks);
  const [loading, updateLoading] = useState(true);

  useEffect(() => {
    retrieveAllTasks().then((t) => {
      updateTasks(t);
      updateLoading(false);
    });
  }, []);

  const createTask = (task: BaseTask) => {
    updateLoading(true);
    createTaskAPI(task).then((t) => {
      const createdTask = { ...task, ...t };
      updateTasks([...tasks, createdTask]);
      updateLoading(false);
    });
  };

  const updateTask = (id: string, task: Partial<BaseTask>) => {
    updateLoading(true);
    updateTaskById(id, task).then(() => {
      const i = tasks.findIndex((t) => t._id === id);
      const tasksCopy = [...tasks];
      const updatedTask = {
        ...tasksCopy[i],
        ...task,
      };
      tasksCopy.splice(i, 1, updatedTask);
      updateTasks(tasksCopy);
      updateLoading(false);
    });
  };

  const deleteTask = (id: string) => {
    updateLoading(true);
    deleteTaskById(id).then(() => {
      const i = tasks.findIndex((t) => t._id === id);
      const tasksCopy = [...tasks];
      tasksCopy.splice(i, 1);
      updateTasks(tasksCopy);
      updateLoading(false);
    });
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
  };
};

/**
 * custom hook that retrieves a single task. It gives the loading status
 * @param id the task identifier
 */
export const useSingleTask = (id: string) => {
  const [task, updateTask] = useState<TaskResponse | null>(null);
  const [loading, updateLoading] = useState(true);

  useEffect(() => {
    retrieveTaskById(id).then((t) => {
      updateTask(t);
      updateLoading(false);
    });
  }, [id]);

  return {
    task,
    loading,
  };
};
