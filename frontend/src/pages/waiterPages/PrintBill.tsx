import { IonButton, IonCard, IonCardContent, IonCheckbox } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"

interface OrderDetails{
    id:number,
    custId:number,
    bill:number,
    tax:number
}

interface OrderItemMapDetails{
    id:number,
    orderId:number,
    itemId:number,
    itemQty:number
}

interface ItemDetails{
    id:number,
    name:string,
    type1:string,
    type2:string,
    price:number,
    tax:number
}

interface CustomerDetails{
    id:number,
    name:string,
    loyalpoints:number
}

interface TableDetails {
    id:number,
    tableNo:number,
    orderNo:number,
    av:boolean,
    seats:number
}

interface ItemRedDetails{
    price:number,
    quantity:number,
    tax:number
}

const PrintBill:React.FC = () => {
    const [order,setOrder] = useState<OrderDetails>()
    const [tabl,setTabl] = useState<TableDetails>()
    const [oims,setOims] = useState<OrderItemMapDetails []>([])
    const [items,setItems] = useState<ItemDetails []>([])
    const [cust,setCust] = useState<CustomerDetails>()
    const [paid,setPaid] = useState(false);
    const [freed,setFreed] = useState(false);
    const [orderf,setOrderf] = useState(false);
    const [lyp,setLyp] = useState(0);
    const [orderfinal,setOrderfinal] = useState<OrderDetails>()
    const [custfinal,setCustfinal] = useState<CustomerDetails>();
    const [lypfinal,setLypFinal] = useState(0)
    const history=useHistory();

    const oId = useParams<{orderId:string}>()
    const tNo = useParams<{tableNo:string}>()

    useEffect(() => {
        fetchOrder();
    },[oId])

    useEffect(() => {
        if(!order)
            return ;
        setOrderf(!orderf)
    },[order])

    useEffect(() => {
        if(!orderf)
            return ;
        fetchCust();
        fetchOIMS();
    },[orderf])

    useEffect(() => {
        if(oims.length === 0)
            return 
        fetchItems();
    },[oims])

    useEffect(() => {
        if(!paid)
            return ;
        billOrder();
    },[paid])

    useEffect(() => {
        if(!tabl)
            return ;
        freeTable();
    },[tabl])

    useEffect(() => {
        if(!freed)
            return ;
        goBack();
    },[freed])

    useEffect(() => {
        if(!orderfinal)
            return ;
        addlyp();
    },[orderfinal])

    useEffect(() => {
        if(!custfinal)
            return ;
        fetchTable();
    },[custfinal])

    useEffect(() => {
        if(lypfinal == 0)
            return ;
        updatelyp();
    },[lypfinal])

    
    const fetchOrder = async () => {
        try{
            const response=await fetch('http://localhost:8082/reception/order-info?id=' + oId.orderId)
            if(!response.ok){
                throw new Error("Failed to fetch order")
            }
            const data = await response.json()
            setOrder(data)
        }catch(error){
            console.log("Error fetching order")
        }
    }

    const fetchCust = async () => {
        if(order?.custId === 0)
            return ;
        try{
            const response=await fetch('http://localhost:8081/customer/get-customer?id=' + order?.custId)
            if(!response.ok){
                throw new Error("Failed to fetch customer")
            }
            const data = await response.text()
            if(data.length === 0)
                return ;
            setCust(JSON.parse(data))
        }catch(error){
            console.log("Error fetching customer")
        }
    }

    const fetchOIMS = async () => {
        try{
            const response=await fetch('http://localhost:8082/reception/order-items?orderId=' + order?.id)
            if(!response.ok){
                throw new Error("Failed to fetch oims")
            }
            const data = await response.text()
            if(data.length === 0)
                return ;
            const data2=JSON.parse(data)
            setOims(data2)
        }catch(error){
            console.log("Error fetching oims")
        }
    }

    const fetchTable = async () => {
        try{
            const response=await fetch('http://localhost:8082/reception/find-table?tableNo=' + tNo.tableNo)
            if(!response.ok){
                throw new Error("Failed to fetch table")
            }
            const data = await response.json()
            setTabl(data)
        }catch(error){
            console.log("Error fetching table")
        }
    }

    const fetchItem = async(itemId) => {
        try{
            const response=await fetch('http://localhost:8082/reception/item-details?id=' + itemId)
            if(!response.ok){
                throw new Error("Failed to fetch item")
            }
            const data = await response.json()
            setItems(items => [...items,data])
        }catch(error){
            console.log("Error fetching item")
        }
    }

    const fetchItems = async () => {
        for(var i=0;i<oims.length;i++){
            fetchItem(oims[i].itemId);
        }
    }

    const freeTable = async () => {
        try{
            const response=await fetch('http://localhost:8081/unbook-table' , {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(tabl?.id)
            })
            if(!response.ok){
                throw new Error("Failed to fetch order")
            }
            const data = await response.json()
        }catch(error){
            console.log("Error fetching order")
        }
    }

    const onSubm = () => {
        billOrder();
    }

    const onSubm2 = () => {
        billOrder2();
        if(!cust || !cust.loyalpoints)
            return ;
        const nlyp=lyp-cust.loyalpoints
        setLyp(nlyp)
    }

    const billOrder = async() => {
        const orditems = oims.map(oim => {
            const itemdets=items.find(item => item.id === oim.itemId)
            if(!itemdets){
                return {}
            }
            return {price:itemdets.price,tax:itemdets.tax,quantity:oim.itemQty}
        })
        function calcbill(total,num){
            return total + num.price*num.quantity;
        }
        
        function calctax(total,num){
            return total + num.tax*num.quantity;
        }
        
        const it=orditems.reduce(calcbill,0)
        const tx=orditems.reduce(calctax,0)
        const nt=it+tx;
        if(!order)
            return (<>cannot reach this</>)
        const neworder={...order,bill:nt,tax:tx}
        setOrderfinal(neworder)
    }

    const billOrder2 = async() => {
        const orditems = oims.map(oim => {
            const itemdets=items.find(item => item.id === oim.itemId)
            if(!itemdets){
                return {}
            }
            return {price:itemdets.price,tax:itemdets.tax,quantity:oim.itemQty}
        })
        function calcbill(total,num){
            return total + num.price*num.quantity;
        }
        
        function calctax(total,num){
            return total + num.tax*num.quantity;
        }
        
        const it=orditems.reduce(calcbill,0)
        const tx=orditems.reduce(calctax,0)
        const nt=it+tx;
        if(!order)
            return (<>cannot reach this</>)
        const neworder={...order,bill:nt,tax:tx}
        setOrderfinal(neworder)
    }

    const addlyp = () => {
        const currpts=cust?.loyalpoints;
        const bill=order?.bill
        if(!currpts || !bill)
            return ;
        const ans=lyp+currpts+bill/20;
        setLypFinal(ans);
    }

    const updatelyp = async() => {
        
    }

    const goBack = () => {}

    function ShowBill(){
        const orditems = oims.map(oim => {
            const itemdets=items.find(item => item.id === oim.itemId)
            if(!itemdets){
                return {}
            }
            return {price:itemdets.price,tax:itemdets.tax,quantity:oim.itemQty}
        })


        function calcbill(total,num){
            return total + num.price*num.quantity;
        }
        
        function calctax(total,num){
            return total + num.tax*num.quantity;
        }
        
        const it=orditems.reduce(calcbill,0)
        const tx=orditems.reduce(calctax,0)
        const nt=it+tx;

        if(Number.isNaN(it) || Number.isNaN(tx))
            return (<></>)

        return(
            <IonCard>
                <IonCardContent>
                    <p>Item Total:<span style={{position:'absolute',right:15}}>{it}</span></p>
                    <p>Taxes:<span style={{position:'absolute',right:15}}>{tx}</span></p>
                    <strong>Total Bill:<span style={{position:'absolute',right:15}}>{nt}</span></strong>
                </IonCardContent>
            </IonCard>
        )
    }

    function CalcBill(){
        return (
            <div className="container">
                <IonCard>
                    <IonCardContent>
                        <p>Order ID: <strong>{oId.orderId}</strong></p>
                    </IonCardContent>
                </IonCard>
                {
                    oims && 
                    <IonCard >
                        <IonCardContent>
                        {
                            oims.map((oim) => {
                                const itemdets=items.find(item => item.id === oim.itemId)
                                if(!itemdets)
                                    return (<div key={oim.id}></div>)
                                return (
                                    <div key={oim.id}>
                                        <p>Item name:<strong><span style={{position:'absolute',right:15}}>{itemdets.name}</span></strong></p>
                                        <p>Item quantity:<strong><span style={{position:'absolute',right:15}}>{oim.itemQty}</span></strong></p>
                                        <strong>Item price:<span style={{position:'absolute',right:15}}>{itemdets.price*oim.itemQty}</span></strong>
                                        <p><br></br></p>
                                    </div>
                                )
                            })
                        }
                        </IonCardContent>
                    </IonCard>
                }
                {
                    cust && cust.loyalpoints >0 &&
                    <IonCard>
                        <IonCardContent>
                            <p>Loyalty Points:{cust.loyalpoints}</p>
                        </IonCardContent>
                    </IonCard>
                }
                {
                    <ShowBill />
                }
                <div className="ion-text-center">
                    <IonButton onClick={onSubm}>Pay bill</IonButton>
                    <IonButton onClick={onSubm2}>Pay bill with lyp</IonButton>
                </div>
            </div>
        )
    }

    

    return (
        <div>
            <CalcBill />
        </div>
    )
}

export default PrintBill



