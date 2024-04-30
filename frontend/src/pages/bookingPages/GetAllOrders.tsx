import { IonGrid, IonRow, IonCol, IonCardContent, IonCard, IonButton, IonButtons, IonText } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

interface OrderRecord{
    id:number,
    custId:number,
    tableNo:number,
    bill:number,
    tax:number,
    showDetail:boolean
}

interface OIM{
    id:number,
    orderId:number,
    itemId:number,
    itemQty:number
}

interface ItemDetails{
    id:number,
    name:string,
    price:number,
    tax:number
}

const GetAllOrders:React.FC = () => {
    const [orders,setOrders]=useState<OrderRecord[]>([])
    const [oims,setOims]=useState<OIM[]>([])
    const [dummy,setDummy]=useState(false);

    useEffect(() => {
        fetchData();
    },[])

    useEffect(() => {
        if(!dummy)
            return ;
        fetchOrders();
    },[dummy])

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8082/reception/orders"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json()
            Object.keys(data).map(order => {
                data[order].showDetail=false
            })
            setOrders(data);
            setDummy(true);
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchOrderDetails = async (id) => {
        try {
            const response = await fetch(
                "http://localhost:8082/reception/order-items?orderId=" + id
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data=await response.json()
            console.log(data)
            setOims(current => current.concat(data));
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchOrders = async () => {
        for(var i=0;i<orders.length;i++){
            fetchOrderDetails(orders[i].id)
        }
    }


    const showOrderDetails = (data:any) => {
        const orderlist=orders.map(order => {
            if(order.id === data.id)
                return {...order,showDetail:!data.showDetail}
            return order
        })
        setOrders(orderlist)
    }

    function ShowItem({id,qty}){

        const [item,setItem] = useState<ItemDetails>()

        const fetchItem = async() => {
            try {
                const response = await fetch(
                    "http://localhost:8082/reception/item-details?id=" + id
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data=await response.json()
                setItem(data)
            }catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchItem()
        if(!item){
            return (
                <>
                Loading...
                </>
            )
        }
        return(
            <div>
                <p>Item Name:<strong>{item.name}</strong></p>
                <p>Item Quantity:<strong>{qty}</strong></p>
                <p>Item Price:<strong>{qty*item.price} </strong></p>
            </div>
        )
    }

    function PrintOIMS({id}){
        return (
            <div>
                {
                    oims.map(oim => {
                        if(oim.orderId === id){
                        return (
                            <div key={oim.id}>
                                <ShowItem id={oim.itemId} qty={oim.itemQty}/>
                                <p><br></br></p>
                            </div>
                        )
                        }
                        return (<div key={oim.id}></div>)
                    })
                }
            </div>
        )
    }


    if(!orders){
        return (
        <>
        Loading
        </>
        )
    }
    return (
        <IonGrid>
        <h1><b><center>Orders:</center></b></h1>
        <p><br></br></p>
        {
            orders.map((order) => (
            <IonCard key={order.id}>
                <IonCardContent>
                    <p>ID: {order.id}</p>
                    <p>Tax:{order.tax}</p>
                    <p>Bill:{order.bill + order.tax}</p>
                    <IonButtons>
                        <IonButton onClick={() => {showOrderDetails(order)}}>Show/Hide Order Details</IonButton>
                    </IonButtons>
                    {
                        order.showDetail && <PrintOIMS id={order.id} />
                    }
                </IonCardContent>
            </IonCard>
            ))
        }
        </IonGrid>
    )
}

export default GetAllOrders