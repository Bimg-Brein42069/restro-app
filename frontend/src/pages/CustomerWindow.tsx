import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonGrid, IonPage, IonRow, IonText, IonTitle } from '@ionic/react';
import './CustomerWindow.css';
import { useEffect, useState } from 'react';
import SideBar from '../components/sidebars/SideBar';
import TopBar from '../components/topbars/TopBar';

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
    </div>
  );
};

export default CustomerWindow;
