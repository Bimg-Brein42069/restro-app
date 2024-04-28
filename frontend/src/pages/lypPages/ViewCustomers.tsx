import { IonGrid, IonRow, IonCol, IonCardContent, IonCard } from "@ionic/react"
import React, { useEffect, useState } from "react"

interface CustomerDetail{
    id:number,
    name:string,
    loyalpoints:number
}

const ViewCustomers:React.FC = () => {
    const [customers,setCustomers]=useState<CustomerDetail []>([])

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8081/customer/"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json()
            setCustomers(data);
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    if(!customers){
        return (
        <>
        Loading
        </>
        )
    }
    return (
        <div className="container">
            <IonGrid>
            {
                customers.map((cust) => (
                    <IonCard key={cust.id}>
                        <IonCardContent>
                            <p>ID: {cust.id}</p>
                            <p>Name:{cust.name}</p>
                            <p>Loyalty Points:{cust.loyalpoints}</p>
                        </IonCardContent>
                    </IonCard>
                ))
            }
            </IonGrid>
        </div>
    )
}

export default ViewCustomers