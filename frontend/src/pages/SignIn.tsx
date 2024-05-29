import { IonButton, IonPage, IonText } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import TextInput from "../components/TextInput";
import { jwtDecode } from "jwt-decode";
import { authLogin,authLogout } from "../redux/user/userSlice"
import { useState } from "react";


const SignIn : React.FC = () => {
    const {control,handleSubmit,reset} = useForm();
    const [msg,setMsg] = useState<String|undefined>();
    const [err,setErr] = useState(false);
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
                console.log('Error logging in')
                setMsg(await res.text());
                return ;
            }
            const token = await res.text();
            const user = jwtDecode(token) as {sub:string, role:string};
            setMsg(undefined);
            dispath(authLogin({jwt:token,user}))
            switch(user.role){
                case 'RECEPTIONIST':
                    history.push('/reception/table-booking')
                    location.reload();
                    break;
                case 'LYPREP':
                    history.push('/customerLYP/view-customers')
                    location.reload();
                    break;
                case 'WAITER':
                    history.push('/waiter')
                    location.reload();
                    break;
                case 'ADMIN':
                    history.push('/admin/sign-up')
                    location.reload();
                    break;
            }
        }
        catch{
            console.error('Network Error')
            setMsg("Network Error");
        }
    }
    return (
        <IonPage>
            <div className='container'>
                <h1><b><center>Sign-In</center></b></h1>
                <IonText color='danger'>{msg}</IonText>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <TextInput name='email' placeHolder='Enter email' label='Email' control={control}/>
                    <TextInput name='password' placeHolder='Enter password' label='Password' control={control}/>
                    <center><IonButton type='submit'>Sign In</IonButton></center>
                </form>
                
            </div>
        </IonPage>
    )
}

export default SignIn;
