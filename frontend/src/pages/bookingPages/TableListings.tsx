import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle } from '@ionic/react';
import './TableListings.css';
import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebars/SideBar';
import TopBarInit from '../../components/topbars/TopBarInit';
import React from 'react';
import TopBarOrder from '../../components/topbars/TopBarOrder';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import { v4 as uuidv4 } from 'uuid';

type FormInputs = {
    custid:number,
    name:string,
    seats:number
}

interface WaitlistDetail {
    id:string,
    custid:number,
    name:string,
    seats:number,
    times:number
}

const TableListings: React.FC = () => {
  const [waitlist,setWaitlist] = useState<WaitlistDetail []>([]);
  const {control,handleSubmit,reset} = useForm();


  const onSubmit = (data:any) => {
    data = {...data, id:uuidv4(),times:Date.now()}
    const wt=[...waitlist,data]
    setWaitlist(wt)
    reset();
  } 
  
  const onSubmit2 = (data) => {
    const wt=waitlist.filter(item => item.id !== data.id)
    const tt = {...data, times:Date.now()}
    const wt2=[...wt,tt]
    setWaitlist(wt2)
  } 

  function TableListings2(){
    return (
      <div className="container">
        <TopBarInit />
        <div className="row">
            <div className="column">
        <div className="ion-text-center">
        <h1><b>Waitlist:</b></h1>
        </div>
        {
          waitlist
          .sort(({times:a},{times:b}) => a-b)
          .map((item,index) => (
            <IonCard key={index}>
              <IonCardContent>
                <p>Name : {item.name}</p>
                <p>No. of seats : {item.seats}</p>
                <p>Entered at : {new Date(item.times).toTimeString()}</p>
                <div className='ion-text-end'>
                    <IonButton onClick={() => onSubmit2(item)}>Book table</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
            )
          )
        }
        </div>
        <div className="column2">
        <form onSubmit={handleSubmit(onSubmit)}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <strong>Book table for new customer:</strong>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <TextInput 
                            name="custId"
                            placeHolder='Enter customer ID if any'
                            label="Customer LYP ID:"
                            control={control}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <TextInput 
                            name="name"
                            placeHolder='Enter customer name'
                            label="Name:"
                            control={control}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <TextInput 
                            name="seats"
                            placeHolder='Enter no. of seats'
                            label="Seats:"
                            control={control}
                        />
                    </IonCol>
                </IonRow>
                <div className='ion-text-center'>
                    <IonButton type='submit'>Book table</IonButton>
                </div>
            </IonGrid>
        </form>
        </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <TableListings2 />
    </>
  );
}

export default TableListings;
