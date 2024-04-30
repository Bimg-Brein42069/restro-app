import { IonGrid, IonRow, IonCol, IonCardContent, IonCard, IonButton, IonButtons, IonText } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

interface CustomerDetail{
    id:number,
    name:string,
    loyalpoints:number
}

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

const GetCustomerDetail:React.FC = () => {
    const [customer,setCustomer]=useState<CustomerDetail>()
    const [orders,setOrders]=useState<OrderRecord[]>([])
    const [test,setTest]=useState(false);
    const [shw,setShw]=useState(false);
    const [oims,setOims]=useState<OIM[]>([])
    const cId=useParams<{custId:string}>();

    useEffect(() => {
        fetchData();
    },[])

    useEffect(() => {
        fetchOrders();
    },[test])

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8081/customer/get-customer?id=" + cId.custId
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json()
            setCustomer(data);
        }catch (error) {
            console.error("Error fetching data:", error);
        }

        try {
            const response = await fetch(
                "http://localhost:8082/reception/orders?custId=" + cId.custId
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json()
            Object.keys(data).map(order => {
                data[order].showDetail=false
            })
            setOrders(data);
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

    const showOrders = () => {
        setShw(!shw);
        setTest(true);
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


    if(!customer){
        return (
        <>
        Loading
        </>
        )
    }
    return (
        <div className="container">
            <IonGrid>
                <IonCard key={customer.id}>
                    <IonCardContent>
                        <p>ID: {customer.id}</p>
                        <p>Name:{customer.name}</p>
                        <p>Loyalty Points:{customer.loyalpoints}</p>
                        <div className="ion-text-center">
                            <IonButton onClick={showOrders}>Show/Hide Orders</IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonGrid>
            {
                shw && 
                <IonGrid>
                <strong><center>Orders:</center></strong>
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
            }
        </div>
    )
}

export default GetCustomerDetail