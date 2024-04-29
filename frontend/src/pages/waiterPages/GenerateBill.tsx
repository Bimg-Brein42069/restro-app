import { IonButton } from "@ionic/react"
import TextInput from "../../components/TextInput"
import React from "react"
import { useForm } from "react-hook-form"

type FormInputs = {
    tableNo:number
}

const GenerateBill:React.FC = () => {
    const {control,handleSubmit,reset} = useForm()

    const onSubm = (data:any) => {
        console.log("Bill generated on table no. " + data.tableNo)
        reset();
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubm)}>
                <TextInput
                    name="tableNo"
                    placeHolder="Enter table number"
                    label="Table Number"
                    control={control} 
                />
                <div className="ion-text-center">
                    <IonButton type='submit'>Generate Bill</IonButton>
                </div>
            </form>
        </div>
    )
}

export default GenerateBill