import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText, IonTitle } from '@ionic/react';
import './CustomerWindow.css';
import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebars/SideBar';
import TopBar from '../../components/topbars/TopBar';
import React from 'react';
import TopBarOrder from '../../components/topbars/TopBarOrder';
import { useHistory } from 'react-router-dom';

interface ItemDetails{
  id:number,
  name:string,
  type1:string,
  type2:string,
  price:number,
  tax:number
}

const CustomerWindow: React.FC = () => {
  const [items,setItems] = useState<any []>([]);
  const history = useHistory();


  useEffect(() => {
    fetchItems();
  },[])

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

  const confirmPage = () => {
    localStorage.setItem('items', JSON.stringify(items));
    history.push("order-window")
  }

  function CustomerWindow2(){
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

  return (
    <>
      <CustomerWindow2 />
    </>
  );
}

export default CustomerWindow;
