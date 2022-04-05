import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { FormEvent } from 'react';
import { BaseTask } from '../../api/tasks/tasks.model';
import './AddTaskForm.css';

type AddTaskProps = {
  onTaskCreation: (task: BaseTask) => void;
};

const AddTaskForm: React.FC<AddTaskProps> = ({ onTaskCreation }: AddTaskProps) => {
  const createTaskHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const task = Object.fromEntries(data.entries()) as BaseTask;
    onTaskCreation(task);
  };

  return (
    <IonCard className="task-form__card">
      <IonCardContent>
        <form onSubmit={createTaskHandle}>
          <IonRow className="ion-align-items-center">
            <IonCol sizeXs="12" sizeMd="6" sizeLg="5">
              <IonItem>
                <IonLabel position="floating">Título</IonLabel>
                <IonInput name="name" required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol sizeXs="12" sizeMd="6" sizeLg="5">
              <IonItem>
                <IonLabel position="floating">Descripción</IonLabel>
                <IonInput name="description"></IonInput>
              </IonItem>
            </IonCol>
            <IonCol className="ion-text-center" sizeXs="12" sizeLg="2">
              <IonButton type="submit" color="primary">
                <IonIcon slot="icon-only" icon={addOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonCardContent>
    </IonCard>
  );
};

export default AddTaskForm;
