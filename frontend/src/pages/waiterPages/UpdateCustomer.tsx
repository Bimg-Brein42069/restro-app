import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";

type FormInputs = {
    id:number
    name:string
    loyalpoints:number
}

const UpdateCustomer:React.FC = () => {
    
    const {control,handleSubmit,reset} = useForm()

    const [customer,setCustomer] = useState<FormInputs>();

    const onSubm = async (data:any) => {
        try {
            const response=await fetch(
                'http://localhost:8081/customer/get-customer?id=' + data.id
            )
            const resp_data=await response.json();
            if(!response.ok){
                throw new Error('Error sending data')
            }
            if(!resp_data){
                alert('Customer does not exist')
                reset()
            }
            else{
                setCustomer(resp_data)
            }
        }catch(error){
            console.error("Error sending data:", error);
        }
    }

    const onSubm2 = async(data:any) => {
        try {
            const response=await fetch(
                'http://localhost:8081/customer/update-customer',{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(data)
                }
            )
            const response_data=await response.json();
            if(!response.ok){
                throw new Error('Error sending data')
            }
            reset()
            alert('Customer Modified Successfully')
            setCustomer(undefined)
        }catch(error){
            console.error("Error sending data:", error);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubm)}>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <TextInput 
                                name="id"
                                placeHolder="Enter existing customer id"
                                label="Customer ID"
                                control={control}
                            />
                        </IonCol>
                    </IonRow>
                    <div className="ion-text-center">
                        <IonButton type='submit'>Find Customer</IonButton>
                    </div>
                </IonGrid>
            </form>
            {customer &&
                <form onSubmit={handleSubmit(onSubm2)}>
                    <IonGrid>
                         <IonRow>
                            <IonCol>
                                <strong>Customer found successfully</strong>
                                <p>Old Name:{customer.name}</p>
                                <p>Loyalty Points:{customer.loyalpoints}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <TextInput 
                                    name="name"
                                    placeHolder="Enter new customer name"
                                    label="Customer Name"
                                    control={control}
                                />
                            </IonCol>
                        </IonRow>
                        <div className="ion-text-center">
                            <IonButton type='submit'>Update Customer Details</IonButton>
                        </div>
                    </IonGrid>
                </form>
            }
        </div>
    );
}

export default UpdateCustomer;