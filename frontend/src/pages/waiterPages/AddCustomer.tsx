import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";

type FormInputs = {
    name:string
    loyaltypoints:number
}

const AddCustomer:React.FC = () => {
    
    const {control,handleSubmit,reset} = useForm()

    const onSubm = (data:any) => {
        data = {...data, loyaltypoints:0}
        console.log(data)
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