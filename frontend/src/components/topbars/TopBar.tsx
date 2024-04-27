import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import './TopBar.css'

const Header: React.FC = () => {

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle className='text-black font-bold'>Restaurant System</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;