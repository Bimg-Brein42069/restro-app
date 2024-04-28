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

const OrderWindow: React.FC = () => {
  const [items,setItems] = useState<any []>([]);
  const [orditems, setOrditems] = useState<any []>([]);
  const [tv,setTv] = useState(false);
  const history = useHistory();


  useEffect(() => {
    fetchItems();
  },[])

  useEffect(() => {
    const orditems=items.filter(item => item.quantity>0);
    setOrditems(orditems)
  },[items])

  const fetchItems = async() => {
    const itemlist = localStorage.getItem('items');
    if (itemlist) {
      const items = JSON.parse(itemlist);
      setItems(items);
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

  const goBack = () => {
    localStorage.setItem('items', JSON.stringify(items));
    history.go(-1)
  }


  const placeOrder = () => {
    console.log('Order Successful')
  }

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
    const nt=it;
    localStorage.setItem('items',JSON.stringify(items))


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
            {/*<p>GST:<span style={{position:'absolute',right:15}}>{tx}</span></p>*/}
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

  function OrderWindow2(){
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
                  <IonButton onClick={() => redquan(item.id)}>-</IonButton><IonButton disabled>{item.quantity}</IonButton><IonButton onClick={() => incquan(item.id)}>+</IonButton>
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
      <OrderWindow2 />
    </>
  );
}

export default OrderWindow;
