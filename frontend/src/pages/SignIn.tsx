import { IonButton, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import TextInput from "../components/TextInput";


const SignIn : React.FC = () => {
    const {control,handleSubmit,reset} = useForm();
    const onsubmit = async (data:any) => {
        console.log(data);
    }
    return (
        <IonPage>
            <div>
                <h1>Sign-In</h1>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <TextInput name='email' placeHolder='Enter email' label='Email' control={control}/>
                    <TextInput name='password' placeHolder='Enter password' label='Password' control={control}/>
                    <IonButton type='submit'>Sign In</IonButton>
                </form>
            </div>
        </IonPage>
    )
}

export default SignIn;