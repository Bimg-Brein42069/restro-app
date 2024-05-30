import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle } from '@ionic/react';
import './TableListings.css';
import { useEffect, useRef, useState } from 'react';
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

interface OrderDetail{
    id:number,
    custId:number,
    bill:number,
    tax:number
}

const TableListings: React.FC = () => {
  const [waitlist,setWaitlist] = useState<WaitlistDetail []>([]);
  const [frun,setFrun] = useState(0);
  const {control,handleSubmit,reset} = useForm({mode:'onSubmit'});
  const [maxseats,setMaxseats] = useState(0);
  const [ord,setOrd] = useState<OrderDetail>();
  const [tabl,setTabl] = useState<TableDetail>();

  const getMaxSeats = async() => {
    try{
      const response=await fetch('http://localhost:8082/reception/max-seats')
      if(!response.ok){
        throw new Error('Failed to verify customer')
      }
      const r_data=await response.json();
      setMaxseats(r_data)
    }catch(error){
      console.error("Error verifying customer")
    }
  }

  const getWaitlist = () => {
    const tlist=localStorage.getItem('waitlist')
    if(!tlist){
      localStorage.setItem('waitlist',JSON.stringify(waitlist));
      return ;
    }
    const wtlist=JSON.parse(tlist);
    setWaitlist(wtlist);
    setFrun(frun+1)
  }


  const booktable = async (data:any) => {
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
        if(data.seats <= maxseats){
          data = {...data, id:uuidv4(),times:Date.now()}
          const wt=[...waitlist,data]
          setWaitlist(wt)
          setFrun(frun+1)
        }
        else{
          alert('Too many seats selected: Please ask customers to split')
          reset()
          return ;
        }
      }
      else{
        setTabl(tabl => JSON.parse(r_data))
      }
      reset();
    }catch(error){
      console.error("Error fetching data:", error);
    }
  }

  const booktable2 = async(data:any) => {
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
      setFrun(frun+1)
      setTabl(tabl => JSON.parse(r_data))
    }catch(error){
      console.error("Error fetching data:", error);
    }
  }

  const verify_order = async (data:any) => {
    if(data.custId === undefined){
      data.custId=0
    }

    try{
      const response=await fetch('http://localhost:8081/customer/get-customer?id=' + data.custId)
      if(!response.ok){
        throw new Error('Failed to verify customer')
      }
      const r_data=await response.text()
      if(r_data.length === 0){
        alert('Customer does not exist on LYP, making order with null custid')
        data.custId=0
      }
    }catch(error){
      console.error("Error verifying customer")
    }
  }

  const create_order = async (data:any) => {
    const ord_data={
      'custId':data.custId,
      'bill':0.0,
      'tax':0.0
    }

    try{
      const response=await fetch('http://localhost:8082/reception/add-order',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(ord_data)
      })
      if(!response.ok){
        throw new Error('Failed to create order')
      }
      const r_data=await response.text()
      setOrd(JSON.parse(r_data))
    }catch(error){
      console.error("Error creating order")
    }
  }

  const assign_table = async() => {
    const table_data={...tabl,orderNo:ord?.id}
    console.log(table_data)
    try{
      const response=await fetch('http://localhost:8082/reception/update-table',{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(table_data)
      })
      if(!response.ok){
        throw new Error('Failed to update table')
      }
      const r_data=await response.text()
    }catch(error){
      console.error("Error updating table" + error)
    }
  }

  useEffect(() => {
    getMaxSeats();
  },[])

  useEffect(() => {
    if(maxseats == 0)
      return ;
    getWaitlist();
  },[maxseats])

  useEffect(() => {
    if(frun === 0)
      return ;
    setLocStor();
  },[frun])

  useEffect(() => {
    if(!ord || ord===undefined)
      return ;
    assign_table()
  },[ord])


  const onSubmit = async (data:any) => {
    booktable(data)
    verify_order(data)
    create_order(data)
  } 

  const onSubmit2 = async (data:any) => {
    booktable2(data)
    verify_order(data)
    create_order(data)
  }

  const setLocStor = () => {
    localStorage.setItem('waitlist',JSON.stringify(waitlist));
  }

  /*
  Bad method: DO NOT UNCOMMENT
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
      setTabl(JSON.parse(r_data))
    }catch(error){
      console.error("Error fetching data:", error);
    }

    
    if(data.custId === undefined){
      data.custId=0
    }

    try{
      const response=await fetch('http://localhost:8081/customer/get-customer?id=' + data.custId)
      if(!response.ok){
        throw new Error('Failed to verify customer')
      }
      const r_data=await response.text()
      if(r_data.length === 0){
        alert('Customer does not exist on LYP, making order with null custid')
        data.custId=0
      }
    }catch(error){
      console.error("Error verifying customer")
    }

    const ord_data={
      'custId':data.custId,
      'bill':0.0,
      'tax':0.0
    }
    console.log(ord_data)

    try{
      const response=await fetch('http://localhost:8082/reception/add-order',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(ord_data)
      })
      if(!response.ok){
        throw new Error('Failed to create order')
      }
      const r_data=await response.text()
      setOrd(JSON.parse(r_data))
    }catch(error){
      console.error("Error creating order")
    }

    const table_data={...tabl,orderNo:ord?.id}
    console.log(table_data)
    try{
      const response=await fetch('http://localhost:8082/reception/update-table',{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(table_data)
      })
      if(!response.ok){
        throw new Error('Failed to update table')
      }
      const r_data=await response.text()
      alert("Table no " + JSON.parse(r_data).tableNo + " has been booked succesfully")
    }catch(error){
      console.error("Error updating table:" + error)
    }
  } */

  function TableListPoll() {

    const [tablestats,setTablestats] = useState<TableDetail []>([])

    const getTableData = async () => {
      try{
      const res = await fetch("http://localhost:8082/reception/get-all-tables");
      const data = await res.json();
      setTablestats(data);
      }catch(error){
        console.error('Unable to fetch table data')
      }
    };

    useEffect(() => {
      const timer = setInterval(getTableData, 10);
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div className='table-row'>
        <div className='table-column'>
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
        <div className='table-column2'>
        <h1><b>Table status</b></h1>
        {
          tablestats.map((tbs) => {
            if(tbs.av === true){
              return (<IonButton key={tbs.id} style={{width:'50px'}} disabled color='success'>{tbs.tableNo}</IonButton>)
            }
            else{
              return (<IonButton key={tbs.id} style={{width:'50px'}} disabled color='danger'>{tbs.tableNo}</IonButton>)
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
        <div className="ion-text-center">
        
          <div className='table-listings'>           
            <TableListPoll />
          </div>
        </div>
        
        <div className="table-column3">
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
    );
  };

  return (
    <>
      <TableListings2 />
    </>
  );
}

export default TableListings;
