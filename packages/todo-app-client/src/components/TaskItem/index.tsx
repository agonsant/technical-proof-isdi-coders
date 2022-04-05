import { IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react';
import { checkmarkCircle, createOutline, informationCircleOutline, trash } from 'ionicons/icons';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseTask, TaskResponse } from '../../api/tasks/tasks.model';

type TaskItemProps = {
  task: TaskResponse;
  onDelete: (id: string) => void;
  onUpdate: (id: string, task: Partial<BaseTask>) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }: TaskItemProps) => {
  const [isEditing, updateEditing] = useState(false);
  const titleEl = useRef<HTMLIonInputElement>(null);

  useLayoutEffect(() => {
    // move the focus to next JS Event Loop because of Web Component Lifecycle
    setTimeout(() => titleEl.current?.setFocus());
  });

  const endEditing = () => {
    updateEditing(false);
    const name = titleEl.current?.value?.toString() ?? '';
    if (task.name !== name) onUpdate(task._id, { name });
  };

  const startEditing = () => {
    updateEditing(true);
  };

  return (
    <IonItem key={task._id}>
      <Link slot="start" to={`/tasks/${task._id}`}>
        <IonIcon
          title="Icono para más información"
          icon={informationCircleOutline}
          color="primary"
        />
      </Link>
      {isEditing ? (
        <IonInput ref={titleEl} value={task.name}></IonInput>
      ) : (
        <IonLabel>
          <h2>{task.name}</h2>
        </IonLabel>
      )}
      {isEditing ? (
        <IonIcon
          onClick={endEditing}
          title="Icono aceptar la edición"
          icon={checkmarkCircle}
          color="success"
          slot="end"
          tabIndex={0}
        />
      ) : (
        <IonIcon
          onClick={startEditing}
          title="Icono editar tarea actual"
          icon={createOutline}
          color="primary"
          slot="end"
          tabIndex={0}
        />
      )}
      <IonIcon
        onClick={() => onDelete(task._id)}
        title="Icono borrar tarea actual"
        icon={trash}
        color="danger"
        slot="end"
        tabIndex={0}
      />
    </IonItem>
  );
};

export default TaskItem;
