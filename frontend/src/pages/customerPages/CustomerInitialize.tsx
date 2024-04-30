import React, { useEffect, useState } from "react";
import CustomerWindow from "./CustomerWindow";
import './CustomerWindow.css';
import { IonButton } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import TopBarInit from "../../components/topbars/TopBarInit";

interface ItemDetails{
    id:number,
    name:string,
    type1:string,
    type2:string,
    price:number,
    tax:number
  }

interface TableDetail{
    id:number
    orderId:number,
}
  
  const CustomerInitialize: React.FC = () => {
    const [items, setItems] = useState<ItemDetails []>([])
    const tNo=useParams<{tableNo:string}>()
    const [orderNo,setOrderNo] = useState();
    const history=useHistory();

    useEffect(() => {
        if(items.length === 0){
            console.log('A')
            return ;
        }
        localStorage.setItem('items',JSON.stringify(items))
    },[items])

    useEffect(() => {
        fetchTable();
    },[tNo])

    useEffect(() => {
        if(!orderNo)
            return ;
        const itemlist=localStorage.getItem('items')
        if(itemlist){
            const items=JSON.parse(itemlist);
            setItems(items);
        }
        else{
            fetchItems();
        }
    },[orderNo])

    const fetchTable= async() => {
        try{
            const response = await fetch(
                "http://localhost:8082/reception/find-table?tableNo=" + tNo.tableNo
            )
            if(!response.ok){
                throw new Error('Failed to find table')
            }
            const data=await response.json();
            console.log(data)
            setOrderNo(data.orderNo)
        }catch(error){
            console.error('Error finding table')
        }
    }

    

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
        
        localStorage.setItem('order-id',JSON.stringify(orderNo))
        localStorage.removeItem('succ')
        history.push("/customerUI/customer-window/" + tNo.tableNo)
        location.reload()
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


    if(!orderNo){
        return (
            <div className='container'>
                <TopBarInit />
                <strong>Please book table at reception and then order.</strong>
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