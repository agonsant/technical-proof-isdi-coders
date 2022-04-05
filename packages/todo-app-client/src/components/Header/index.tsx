import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { checkboxOutline } from 'ionicons/icons';

type HeaderProps = {
  title?: string;
  backButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, backButton = false }: HeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {backButton ? <IonBackButton /> : ''}
          <IonButton>
            <IonIcon icon={checkboxOutline} color="primary" />
          </IonButton>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
