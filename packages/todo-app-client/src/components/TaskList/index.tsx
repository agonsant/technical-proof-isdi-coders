import { IonImg, IonList, IonText } from '@ionic/react';
import { BaseTask, TaskResponse } from '../../api/tasks/tasks.model';
import NotTask from '../../assets/img/no-tasks.svg';
import TaskItem from '../TaskItem';
import './TaskList.css';

type TaskListProps = {
  tasks: TaskResponse[];
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, task: Partial<BaseTask>) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onUpdateTask,
}: TaskListProps) => {
  return tasks.length === 0 ? (
    <div className="ion-text-center">
      <IonImg
        alt="Imagen donde se puede ver personas añadiendo tareas en un tablero"
        className="list__img--not-found"
        src={NotTask}
      />
      <IonText>
        <h2>¿Que quieres hacer hoy?</h2>
      </IonText>
    </div>
  ) : (
    <IonList>
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onDelete={onDeleteTask} onUpdate={onUpdateTask} />
      ))}
    </IonList>
  );
};

export default TaskList;
