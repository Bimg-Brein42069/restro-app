import { IonButton } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import TopBar from "../../components/topbars/TopBar"
import './waiter.css'

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
            <div className="ion-text-center waiter-list">
                <strong>Click on sidebar for options</strong>
            </div>
        </div>
    )
}

export default WaiterInit;