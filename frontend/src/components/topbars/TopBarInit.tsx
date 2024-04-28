import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import './TopBar.css'
import React from 'react';

const Header: React.FC = () => {

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle className='text-black font-bold'>Restaurant System</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;