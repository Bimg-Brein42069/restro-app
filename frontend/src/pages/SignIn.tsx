import { IonButton, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import TextInput from "../components/TextInput";
import { jwtDecode } from "jwt-decode";
import { authLogin,authLogout } from "../redux/user/userSlice"


const SignIn : React.FC = () => {
    const {control,handleSubmit,reset} = useForm();
    const history=useHistory();
    const dispath=useDispatch();
    const onsubmit = async (data:any) => {
        try{
            const res = await fetch('http://localhost:8085/api/auth/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if(!res.ok){
                console.log('Error logging in:' + await res.text())
                return ;
            }
            const token = await res.text();
            const user = jwtDecode(token) as {sub:string, role:string};
            dispath(authLogin({jwt:token,user}))
            console.log({jwt:token,user});
            dispath(authLogout())
            reset()
        }
        catch{
            console.error('Network Error')
        }
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
