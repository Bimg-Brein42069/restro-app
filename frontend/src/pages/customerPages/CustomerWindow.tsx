import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText, IonTitle } from '@ionic/react';
import './CustomerWindow.css';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import TopBarOrder from '../../components/topbars/TopBarOrder';
import { useHistory, useParams } from 'react-router-dom';

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
  const tNo = useParams<{tableNo:string}>()
  const [filter1,setFilter1] = useState<any []>([])
  const [filter2,setFilter2] = useState<any []>([])

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
    history.push("/customerui/order-window/" + tNo.tableNo)
    location.reload()
  }

  function filterfn(item:any){
    const l1=filter1.length,l2=filter2.length;
    if(l1 == 0 && l2 == 0)
      return true;
    if(l1 == 0)
      return filter2.includes(item.type2)
    if(l2 == 0)
      return filter1.includes(item.type1)
    return filter1.includes(item.type1) && filter2.includes(item.type2)
  }
  function changeFilter1(arg0: string) {
    if(filter1.includes(arg0))
      setFilter1(filter1 => filter1.filter((st)=>st!=arg0));
    else
      setFilter1(filter1 => [...filter1,arg0])
  }

  function changeFilter2(arg0: string) {
    if(filter2.includes(arg0))
      setFilter2(filter2 => filter2.filter((st)=>st!=arg0));
    else
      setFilter2(filter2 => [...filter2,arg0])
  }

  function CustomerWindow2(){

    return (
      <div className="container">
        <p><br></br></p> 
        <IonButtons className='filter-buttons'>
          <IonButton disabled={true}>Type of item:</IonButton>
          {filter1.includes('Burger') ? <IonButton color='warning' onClick={() => changeFilter1('Burger')}>Burger</IonButton> : <IonButton onClick={() => changeFilter1('Burger')}>Burger</IonButton>}
          {filter1.includes('Sandwich') ? <IonButton color='warning' onClick={() => changeFilter1('Sandwich')}>Sandwich</IonButton> : <IonButton onClick={() => changeFilter1('Sandwich')}>Sandwich</IonButton>}
          {filter1.includes('Dessert') ? <IonButton color='warning' onClick={() => changeFilter1('Dessert')}>Dessert</IonButton> : <IonButton onClick={() => changeFilter1('Dessert')}>Dessert</IonButton>}
        </IonButtons>
        <IonButtons className='filter-buttons'>
          {filter2.includes('Veg') ? <IonButton color='success' onClick={() => changeFilter2('Veg')}>Veg</IonButton> : <IonButton onClick={() => changeFilter2('Veg')}>Veg</IonButton>}
          {filter2.includes('Non-Veg') ? <IonButton color='danger' onClick={() => changeFilter2('Non-Veg')}>Non-Veg</IonButton> : <IonButton onClick={() => changeFilter2('Non-Veg')}>Non-Veg</IonButton>}
        </IonButtons>
        {
          items.filter((item) => filterfn(item)).map(item => (
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

  if(!tNo){
    return (
      <></>
    )
  }

  return (
    <>
      <CustomerWindow2 />
    </>
  );
}

export default CustomerWindow;
