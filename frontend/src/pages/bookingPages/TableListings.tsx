import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle } from '@ionic/react';
import './TableListings.css';
import { useEffect, useRef, useState } from 'react';
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

interface TableDetail {
    id:number
    av:boolean
    seats:number
    tableNo:number
}

const TableListings: React.FC = () => {
  const [waitlist,setWaitlist] = useState<WaitlistDetail []>([]);
  const {control,handleSubmit,reset} = useForm({mode:'onSubmit'});


  const onSubmit = async (data:any) => {
    try{
      const response=await fetch('http://localhost:8082/reception/book-table?seats=' + data.seats,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(!response.ok){
        throw new Error('Failed to book table')
      }
      const r_data=await response.text()
      if(r_data.length === 0){
        data = {...data, id:uuidv4(),times:Date.now()}
        const wt=[...waitlist,data]
        setWaitlist(wt)
      }
      reset();
    }catch(error){
      console.error("Error fetching data:", error);
    }
  } 

  const onSubmit2 = async (data:any) => {
    try{
      const response=await fetch('http://localhost:8082/reception/book-table?seats=' + data.seats,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(!response.ok){
        throw new Error('Failed to book table')
      }
      const r_data=await response.text()
      const wt=waitlist.filter(wat => wat.id !== data.id)
      setWaitlist(wt)
    }catch(error){
      console.error("Error fetching data:", error);
    }
  } 

  function TableListPoll() {

    const [tablestats,setTablestats] = useState<TableDetail []>([])

    const getAnswer = async () => {
      const res = await fetch("http://localhost:8082/reception/get-all-tables");
      const data = await res.json();
      setTablestats(data);
    };

    useEffect(() => {
      const timer = setInterval(getAnswer, 10);
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div className='row'>
        <div className='column'>
        <h1><b>Waitlist:</b></h1>
        {
          waitlist
          .sort(({times:a},{times:b}) => a-b)
          .map((item,index) => (
            <IonCard key={index}>
              <IonCardContent>
                <p>Name : {item.name}</p>
                <p>No. of seats : {item.seats}</p>
                <p>Entered at : {new Date(item.times).toTimeString()}</p>
                {
                  tablestats.find((tbs) => tbs.seats >= item.seats && tbs.av===true) ? 
                  <div className='ion-text-end'>
                      <IonButton onClick={() => onSubmit2(item)}>Book table</IonButton>
                  </div>
                  :
                  <div className='ion-text-end'>
                      <IonButton disabled>Book table</IonButton>
                  </div>
                }
              </IonCardContent>
            </IonCard>
            )
          )
        }
        </div>
        <div className='column2'>
        <h1><b>Table status</b></h1>
        {
          tablestats.map((tbs) => {
            if(tbs.av === true){
              return (<IonButton style={{width:'50px'}} disabled color='success'>{tbs.tableNo}</IonButton>)
            }
            else{
              return (<IonButton style={{width:'50px'}} disabled color='danger'>{tbs.tableNo}</IonButton>)
            }
          })
        }
        </div>
      </div>
    );
  }

  function TableListings2(){
    return (
      <div className="container">
        <TopBarInit />
        <div className="row">
            <div className="column">
        <div className="ion-text-center">
        
        <div className='table-listings'>
            
            <TableListPoll />
          </div>
        </div>
        
        </div>
        
        <div className="column3">
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
