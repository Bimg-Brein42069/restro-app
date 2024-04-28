import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText, IonTitle } from '@ionic/react';
import './CustomerWindow.css';
import { useEffect, useState } from 'react';
import SideBar from '../components/sidebars/SideBar';
import TopBar from '../components/topbars/TopBar';
import React from 'react';
import TopBarOrder from '../components/topbars/TopBarOrder';
import { useHistory } from 'react-router-dom';

interface ItemDetails{
  id:number,
  name:string,
  type1:string,
  type2:string,
  price:number,
  tax:number
}

const CondWindow: React.FC = () => {
  const [items,setItems] = useState<any []>([]);
  const [orditems, setOrditems] = useState<any []>([]);
  const [cnf,setCnf] = useState(false);
  const [tv,setTv] = useState(false);
  const history = useHistory();


  useEffect(() => {
    fetchItems();
  },[])

  const fetchItems = async() => {
    try {
      const response = await fetch(
        "http://localhost:8082/reception/get-items"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      Object.keys(data).map((item)=>{
        data[item].quantity=0;
      })
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const redquan = (id:any) => {
    setItems(
        items.map((item) => {
          if(item.id === id)
            return {...item,quantity:item.quantity-1};
          else
            return item
        })  
    )
  }

  const incquan = (id:any) => {
    setItems(
      items.map((item) => {
        if(item.id===id)
          return {...item,quantity:item.quantity+1}
        else
          return item
      })
    )
  }

  const confirmPage = () => {
    setCnf(true);
    const orditems = items.filter(item => item.quantity > 0);
    setOrditems(orditems);
  }

  const goBack = () => {
    const olditems=items.map(item => {
      if(orditems.find(ito => ito.id == item.id))
        return {...item,quantity:orditems.find(ito => ito.id == item.id).quantity}
      return {...item,quantity:0};
    })
    setItems(olditems);
    setCnf(false);
  }

  const placeOrder = () => {
    console.log(orditems)
  }

  const redquan2 = (id:any) => {
    setOrditems(
        orditems.map((item) => {
          if(item.id === id){
            return {...item,quantity:item.quantity-1};
          }
          else
            return item
        }).filter(item => item.quantity>0)
    )
  }

  const incquan2 = (id:any) => {
    setOrditems(
        orditems.map((item) => {
          if(item.id === id){
            return {...item,quantity:item.quantity+1};
          }
          else
            return item
        })  
    )
  }

  function CustomerWindow(){
    return (
      <div className="container">
        <TopBar />
        {
          items.map(item => (
            <IonCard key={item.id}>
              <IonCardContent>
                <strong>{item.name}</strong>
                <p>{item.type1} | {item.type2}</p>
                <p>{item.price} Rs.</p>
                {
                  item.quantity > 0 ?
                    <div className="ion-text-end">
                    <IonButton onClick={() => redquan(item.id)}>-</IonButton><IonButton disabled>{item.quantity}</IonButton><IonButton onClick={() => incquan(item.id)}>+</IonButton>
                    </div>
                    :
                    <div className="ion-text-end">
                    <IonButton onClick={() => incquan(item.id)}>Add +</IonButton>
                    
                    </div>
                }
              </IonCardContent>
            </IonCard>
            )
          )
        }
        <div className='ion-text-center'>
            <IonButton onClick={confirmPage}>Place Order</IonButton>
        </div>
      </div>
    );
  };

  function calcbill(total,num){
    return total + num.price*num.quantity;
  }

  function calctax(total,num){
    return total + num.tax*num.quantity;
  }

  function PrintBill(){
    const it=orditems.reduce(calcbill,0)
    const tx=orditems.reduce(calctax,0)
    const sc=it*0.05;
    const nt=it+tx;


    const showmore = () => {
      setTv(!tv);
    }

    return (
      <IonCard>
        {
          tv ?
        <IonCardContent>
            <IonButtons>
              <IonButton onClick={showmore}>- Show Less</IonButton>
            </IonButtons>
            <p>Item Total:<span style={{position:'absolute',right:15}}>{it}</span></p>
            <p>GST:<span style={{position:'absolute',right:15}}>{tx}</span></p>
            {/*<p>Service Charge:<span style={{position:'absolute',right:15}}>{sc}</span></p>*/}
            
          <div className='new-line'>
          <strong>Total Bill:<span style={{position:'absolute',right:15}}>{nt}</span></strong>
          </div>
        </IonCardContent>
        :
        <IonCardContent>
            <IonButtons>
            <IonButton onClick={showmore}>+ Show detailed Bill</IonButton>
            </IonButtons>
          <div className='new-line'>
          <strong>Total Bill:<span style={{position:'absolute',right:15}}>{nt}</span></strong>
          </div>
        </IonCardContent>
        }
      </IonCard>
    )
  }

  function OrderWindow(){
    return (
      <div className="container">
        <TopBarOrder />
        {
          orditems.length>0 ?
          orditems.map(item => (
            <IonCard key={item.id}>
              {
              item.quantity>0 &&
              <IonCardContent>
                <strong>{item.name}<span style={{position:'absolute',right:15}}>{item.price * item.quantity} Rs.</span></strong> 
                <div className="ion-text-end">
                  <IonButton onClick={() => redquan2(item.id)}>-</IonButton><IonButton disabled>{item.quantity}</IonButton><IonButton onClick={() => incquan2(item.id)}>+</IonButton>
                </div>
              </IonCardContent>
              }
            </IonCard>
            ))
          :
          <div>
            <strong><center>Please go back and add items</center></strong>
          </div>
        }
        {
          orditems.length>0 ?
          <PrintBill />
          :
          <></>
        }
        <div className='ion-text-center'>
            <IonButton onClick={goBack}>Go Back</IonButton>
            {
                orditems.length>0?
                   <IonButton onClick={placeOrder}>Place Order</IonButton>
                  :
                  <IonButton disabled>Place Order</IonButton>
            }
        </div>
        
      </div>
    );
  };

  return (
    <>
      {
      !cnf?
      <CustomerWindow />
      :
      <OrderWindow />
      }
    </>
  );
}

export default CondWindow;
