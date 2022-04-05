/**
 * MAIN TASKS TYPES
 */

export type BaseTask = {
  name: string;
  description?: string;
};

export type TaskId = {
  _id: string;
};

export type TaskResponse = BaseTask & TaskId;

/**
 * Info from the tasks needed by the UI
 */
export type TasksHook = {
  tasks: TaskResponse[];
  loading: boolean;
  createTask: (task: BaseTask) => void;
  updateTask: (id: string, task: Partial<BaseTask>) => void;
  deleteTask: (id: string) => void;
};
