import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton, IonText } from '@ionic/react';
import './TopBar.css'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../redux/user/userSlice'
import { useHistory } from 'react-router';

const Header: React.FC = () => {
  const user = useSelector((state:any) => state.user.currentUser)
  const jwt = useSelector((state:any) => state.user.jwt)
  const dispath = useDispatch();
  const history = useHistory();
  const signout = () => {
    dispath(authLogout());
  }
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle className='text-black font-bold'>Restaurant System</IonTitle>
        <IonButtons slot="end">
          <IonButton disabled={true} className='text-black font-bold'>{user.name}</IonButton>
          <IonButton disabled={true} className='text-black font-bold'>{user.role}</IonButton>
          <IonButton onClick={signout} className='text-black font-bold bg-gray-200'>Sign Out</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;