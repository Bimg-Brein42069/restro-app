import React, { useEffect, useState } from "react";
import CustomerWindow from "./CustomerWindow";
import './CustomerWindow.css';
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import TopBarInit from "../../components/topbars/TopBarInit";

interface ItemDetails{
    id:number,
    name:string,
    type1:string,
    type2:string,
    price:number,
    tax:number
  }
  
  const CustomerInitialize: React.FC = () => {
    const [items, setItems] = useState<ItemDetails []>([])
    
    const history=useHistory();


    useEffect(() => {
        const itemlist=localStorage.getItem('items')
        if(itemlist){
            const items=JSON.parse(itemlist);
            setItems(items);
        }
        else{
            fetchItems();
        }
    },[])

    const fetchItems = async() => {
        try {
            const response = await fetch(
                "http://localhost:8082/reception/get-items"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json()
            Object.keys(data).map((item)=>{
                data[item].quantity=0;
            })
            setItems(data);
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const startOrder = () => {
        localStorage.setItem('items',JSON.stringify(items))
        localStorage.removeItem('succ')
        history.push("/customerUI/customer-window")
    }
    
    function Sendmsg(){
        const msglist=localStorage.getItem('succ');
        if(!msglist){
            return (
                <div className='container'>
                    <div className='ion-text-center'>
                        <strong>Begin your enriching and captivating experience</strong>
                        <p><IonButton onClick={startOrder}>Start Ordering</IonButton></p>
                    </div>
                </div>
            )
        }
        const msg=JSON.parse(msglist)
        console.log(msg.message)
        return (
            <div className='container'>
                <div className='ion-text-center'>
                    <strong>{msg.message}</strong>
                    <p><IonButton onClick={startOrder}>Order More</IonButton></p>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <TopBarInit />
            <Sendmsg />
        </div>
    );
  }

  export default CustomerInitialize;