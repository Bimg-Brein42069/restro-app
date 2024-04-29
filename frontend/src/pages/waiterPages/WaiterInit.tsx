import { IonButton } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import TopBar from "../../components/topbars/TopBar"

const WaiterInit:React.FC = () => {

    const history=useHistory();

    const genbill = () => {
        history.push('/waiter/generate-bill')
    }

    const addcust = () => {
        history.push('/waiter/add-customer')
    }

    const updatecust = () => {
        history.push('/waiter/update-customer')
    }


    return (
        <div className="container">
            <TopBar />
            <div className="ion-text-center">
                <IonButton onClick={genbill}>Generate Bill</IonButton>
                <IonButton onClick={addcust}>Add Customer</IonButton>
                <IonButton onClick={updatecust}>Update Customer</IonButton>
            </div>
        </div>
    )
}

export default WaiterInit;