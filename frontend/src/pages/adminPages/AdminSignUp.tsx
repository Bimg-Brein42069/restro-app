import { IonButton, IonItem, IonPage, IonSelect, IonSelectOption } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";

const AdminSignUp:React.FC = () => {
    const {control,handleSubmit,reset,resetField} = useForm()
    const onSubmit = async (data:any) => {
        if(data.passwordc != data.password){
            alert('Passwords Do not match')
            resetField('password');
            resetField('passwordc');
            return ;
        }
        delete data.passwordc;
        try{
            const res=await fetch('http://localhost:8085/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                alert('Failed to add user:' + await res.text())
                return ;
            }
            alert('User ' + data.email + ' Added Successfully')
            reset()
        }
        catch{
            alert('Error adding user')
        }
    }
    return (
        <IonPage>
            <div className="container">
                <h1><b><center><span style={{fontSize:'25px'}}>Add details of new employee</span></center></b></h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput name='name' placeHolder="Enter name of new employee" label="Name" control={control} />
                    <TextInput name='email' placeHolder="Enter email-id of new employee" label="Email-ID" control={control} />
                    <TextInput name='password' placeHolder="Enter new password" label="New Password" control={control} />
                    <TextInput name='passwordc' placeHolder="Confirm new password" label="Confirm Password" control={control} />
                    <IonItem>
                        <Controller
                            control={control}
                            name="role"
                            render={({field:{onChange,value}}) => (
                                <IonSelect value={value} placeholder="Role" onIonChange={onChange}>
                                    <IonSelectOption value="RECEPTIONIST">Receptionist</IonSelectOption>
                                    <IonSelectOption value="WAITER">Waiter</IonSelectOption>
                                    <IonSelectOption value="LYPREP">LYP Representative</IonSelectOption>
                                </IonSelect>
                            )}
                        />
                    </IonItem>
                    <center><IonButton type='submit'>Sign Up</IonButton></center>
                </form>
            </div>
        </IonPage>
    )
}

export default AdminSignUp;