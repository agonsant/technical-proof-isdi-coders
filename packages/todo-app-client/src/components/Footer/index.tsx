import { IonFooter, IonTitle, IonToolbar } from '@ionic/react';

const Footer: React.FC = () => {
  return (
    <IonFooter collapse="fade">
      <IonToolbar>
        <IonTitle>Made with ❤️ by Alex G. under MIT license</IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
