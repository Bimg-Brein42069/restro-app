import { IonGrid, IonRow, IonCol, IonCardContent, IonCard, IonButton } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

interface CustomerDetail{
    id:number,
    name:string,
    loyalpoints:number
}

const ViewCustomers:React.FC = () => {
    const [customers,setCustomers]=useState<CustomerDetail []>([])
    const history=useHistory();

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

    const loadDetails = (id) => {
        history.push('/customerLYP/customer-detail/' + id)
    }

    if(!customers){
        return (
        <div>
            <p>Loading...</p>
        </div>
        )
    }
    return (
        <div className="container">
            <p><h1>Members List</h1></p>
            <IonGrid>
            {
                customers.map((cust) => (
                    <IonCard key={cust.id}>
                        <IonCardContent>
                            <p>ID: {cust.id}</p>
                            <p>Name:{cust.name}</p>
                            <p>Loyalty Points:{cust.loyalpoints}</p>
                            <div className="ion-text-end">
                                <IonButton onClick={() => loadDetails(cust.id)}>View Details</IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>
                ))
            }
            </IonGrid>
        </div>
    )
}

export default ViewCustomers