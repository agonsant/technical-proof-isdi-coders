import { BaseTask, TaskId, TaskResponse } from './tasks.model';

const BASE_PATH = '/tasks';

/**
 * Retrieve all tasks from API after its promise is resolved
 * @returns A promise that when is fulfilled it returns the tasks list
 */
export const retrieveAllTasks = async (): Promise<TaskResponse[]> => {
  const r = await fetch(`${process.env.REACT_APP_BASE_API}${BASE_PATH}`);
  const tasks = await r.json();
  return tasks;
};

/**
 * Creates a task in the server returning the created task with its id
 * @param task the task information to be stored
 * @returns A promise that when is fulfilled it returns the task created
 */
export const createTask = async (task: BaseTask): Promise<TaskId> => {
  const r = await fetch(`${process.env.REACT_APP_BASE_API}${BASE_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const createdTask = await r.json();
  return createdTask;
};

/**
 * retieves a task from the server by its identifier
 * @param id the task identifier
 * @returns A promise that when is fulfilled it returns the task
 */
export const retrieveTaskById = async (id: string): Promise<TaskResponse> => {
  const r = await fetch(`${process.env.REACT_APP_BASE_API}${BASE_PATH}/${id}`);
  return await r.json();
};

/**
 * Update an existing task with a new information
 * @param id the task identifier
 * @param task the partial task to be updated
 */
export const updateTaskById = async (id: string, task: Partial<BaseTask>): Promise<void> => {
  await fetch(`${process.env.REACT_APP_BASE_API}${BASE_PATH}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};

/**
 * removes a task from the server by its identifier
 * @param id the task identifier
 */
export const deleteTaskById = async (id: string): Promise<void> => {
  await fetch(`${process.env.REACT_APP_BASE_API}${BASE_PATH}/${id}`, {
    method: 'DELETE',
  });
};
