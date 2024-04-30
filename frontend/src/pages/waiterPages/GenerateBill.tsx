import { IonButton } from "@ionic/react"
import TextInput from "../../components/TextInput"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router"
import TopBarInit from "../../components/topbars/TopBarInit"

type FormInputs = {
    tableNo:number
}

interface TableDetails{
    id:number,
    tableNo:number,
    orderNo:number
}

const GenerateBill:React.FC = () => {
    const {control,handleSubmit,reset} = useForm()
    const history = useHistory();
    const [order,setOrder] = useState<TableDetails>()

    useEffect(() => {
        if(!order)
            return ;
        history.push('print-bill/' + order.orderNo + '/' + order.tableNo)
    },[order])

    const fetchTable = async (tableNo) => {
        try{
            const response= await fetch('http://localhost:8082/reception/find-table?tableNo=' + tableNo)
            if(!response.ok){
                throw new Error('Failed to fetch table')
            }
            const data=await response.text()
            if(data.length === 0){
                alert('Table does not exist, please enter valid tableNo')
                reset()
            }
            else
                setOrder(JSON.parse(data))
        }catch(error){
            console.error('Error fetching table')
        }
    }

    const onSubm = (data:any) => {
        fetchTable(data.tableNo);
    }

    return (
        <div className="container">
            <TopBarInit />
            <p><br></br></p>
            <form onSubmit={handleSubmit(onSubm)}>
                <TextInput
                    name="tableNo"
                    placeHolder="Enter table number"
                    label="Table Number"
                    control={control} 
                />
                <p><br></br></p>
                <div className="ion-text-center">
                    <IonButton type='submit'>Generate Bill</IonButton>
                </div>
            </form>
        </div>
    )
}

export default GenerateBill