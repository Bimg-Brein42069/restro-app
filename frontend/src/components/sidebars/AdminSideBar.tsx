import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';
import './SideBar.css'
import React from 'react';

const AdminSideBar: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='font-bold'>Admin Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/admin/sign-up" routerDirection="none">
              <IonLabel>Add new employee detail</IonLabel>
            </IonItem>
            <IonItem routerLink="/admin/item-list" routerDirection="none">
              <IonLabel>Access Items Offered</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default AdminSideBar;