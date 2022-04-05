import { IonContent, IonGrid, IonLoading, IonPage, IonRow, IonText } from '@ionic/react';
import { useParams } from 'react-router';
import { useSingleTask } from '../../api/tasks/tasks.hooks';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

type TaskDetailsParams = {
  id: string;
};

const TaskDetails: React.FC = () => {
  const { id } = useParams<TaskDetailsParams>();
  const { task, loading } = useSingleTask(id);
  return (
    <IonPage>
      <Header title={task?.name} backButton={true} />
      <IonContent className="ion-padding">
        <IonLoading isOpen={loading} message={'Realizando operación...'} />
        <IonGrid>
          <IonRow>
            <IonText>
              <p>{task?.description}</p>
            </IonText>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer></Footer>
    </IonPage>
  );
};

export default TaskDetails;
