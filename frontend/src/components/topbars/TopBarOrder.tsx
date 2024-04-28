import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton, IonBackButton } from '@ionic/react';
import './TopBar.css'
import React from 'react';
import {caretBack} from 'ionicons/icons'

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref='customer-window'></IonBackButton>
        </IonButtons>
        <IonTitle className='text-black font-bold'>Restaurant System</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;