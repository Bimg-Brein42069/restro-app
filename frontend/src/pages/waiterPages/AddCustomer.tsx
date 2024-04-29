import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";

type FormInputs = {
    name:string
    loyalpoints:number
}

const AddCustomer:React.FC = () => {
    
    const {control,handleSubmit,reset} = useForm()

    const onSubm = async (data:any) => {
        data = {...data,loyalpoints:0}
        try {
            const response=await fetch(
                'http://localhost:8081/customer/add-customer',{
                    method:'POST',
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
            alert('Customer Added Successfully')
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
                                name="name"
                                placeHolder="Enter new customer name"
                                label="Customer Name"
                                control={control}
                            />
                        </IonCol>
                    </IonRow>
                    <div className="ion-text-center">
                        <IonButton type='submit'>Add Customer</IonButton>
                    </div>
                </IonGrid>
            </form>
        </div>
    );
}

export default AddCustomer;