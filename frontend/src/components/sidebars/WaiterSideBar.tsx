import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';
import './SideBar.css'
import React from 'react';

const WaiterSideBar: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='font-bold'>Waiter Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/waiter/generate-bill" routerDirection="none">
              <IonLabel>Generate Bill</IonLabel>
            </IonItem>
            <IonItem routerLink="/waiter/add-customer" routerDirection="none">
              <IonLabel>Add new LYP member</IonLabel>
            </IonItem>
            <IonItem routerLink="/waiter/update-customer" routerDirection="none">
              <IonLabel>Modify LYP member detail</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default WaiterSideBar;