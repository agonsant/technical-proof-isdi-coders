import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow } from '@ionic/react';
import { useTasks } from '../../api/tasks/tasks.hooks';
import AddTaskForm from '../../components/AddTaskForm';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TaskList from '../../components/TaskList';
import './Home.css';

const Home: React.FC = () => {
  const { tasks, loading, createTask, deleteTask, updateTask } = useTasks(); // hook for managing the tasks and its operations
  return (
    <IonPage>
      <Header title="Todo APP for ISDI Coders using Ionic+React"></Header>
      <IonContent className="ion-padding">
        <IonLoading isOpen={loading} message={'Realizando operación...'} />
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <AddTaskForm onTaskCreation={createTask}></AddTaskForm>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <TaskList
                tasks={tasks}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}></TaskList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer></Footer>
    </IonPage>
  );
};

export default Home;
