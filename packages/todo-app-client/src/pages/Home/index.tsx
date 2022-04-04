import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { TaskResponse } from '../../api/tasks/tasks.model';
import './Home.css';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<TaskResponse[]>([]);
  useEffect(() => {
    async function doFetch() {
      const result = await fetch('http://localhost:4000/tasks');
      const data = await result.json();
      setTodos(data);
    }
    doFetch();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {todos.length === 0 ? (
          <div>No todos, add some!</div>
        ) : (
          <IonList>
            {todos.map((todo) => (
              <IonItem key={todo._id}>
                <IonLabel>
                  <h2>{todo.name}</h2>
                </IonLabel>
                <IonIcon data-icon="trash" icon={trash} color="danger" slot="end" />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
