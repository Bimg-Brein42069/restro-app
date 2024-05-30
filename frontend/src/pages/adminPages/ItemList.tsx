import { IonButton, IonButtons, IonCard, IonCardContent, IonPage, IonRow, IonText } from "@ionic/react"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import "./ItemList.css"

const ItemList:React.FC = () => {
    const [items,setItems] = useState<any []>([]);
    const [counter,setCounter] = useState(0);
    const {control,handleSubmit,reset} = useForm();
    const [iid,setIid] = useState(-1);

    useEffect(() => {
        fetchItems();
    },[counter])

    const fetchItems = async () => {
        try{
            const res = await fetch('http://localhost:8082/reception/get-items');
            if(!res.ok){
                console.error('Failed to fetch items:' + await res.text())
                return ;
            }
            const data= await res.json();
            setItems(data);
        }
        catch(error){
            console.error('Network error')
        }
    }

    const addItem = async (data:any) => {
        try{
            const res = await fetch('http://localhost:8082/reception/create-item',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                console.error('Failed to add item:' + await res.text())
                return ;
            }
            setCounter(1-counter);
        }
        catch(error){
            console.error('Network error')
        }
    }

    const changeItem = async (data:any) => {
        data = {...data,id:iid}
        try{
            const res = await fetch('http://localhost:8082/reception/update-item',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                console.error('Failed to update item:' + await res.text())
                return ;
            }
            setCounter(1-counter);
            setIid(-1);
        }
        catch(error){
            console.error('Network error')
        }
    }



    return (
        <IonPage>
            <div className="container">
                <div className="admin-row">
                    <div className="item-list">
                    <h1><b><span style={{paddingLeft: '10px'}}>Item List</span></b></h1>
                    {
                        items.map((item) => (
                            <IonCard key={item.id}>
                                <IonCardContent>
                                    <p><IonText>Item Name:{item.name}</IonText></p>
                                    <p><IonText>Item Menu Price:{item.price}</IonText></p>
                                    <p><IonText>Item Type 1:{item.type1}</IonText></p>
                                    <p><IonText>Item Type 2:{item.type2}</IonText></p>
                                    <p><IonText>Item Tax:{item.tax}</IonText></p>
                                    <IonButtons>
                                        <IonButton onClick={() => setIid(item.id)}> Mark for change </IonButton>
                                    </IonButtons>
                                </IonCardContent>
                            </IonCard>
                        ))
                    }
                    </div>
                <div className="admin-column">
                    <div className="admin-row">
                        <div className="item-add-form-text">
                            <h1><b>Add new item</b></h1>
                        </div>
                        <form className='item-add-form' onSubmit={handleSubmit(addItem)}>
                            <TextInput name='name' placeHolder="Enter item name" label="Name" control={control} />
                            <TextInput name='price' placeHolder="Enter item price" label="Price" control={control} />
                            <TextInput name='tax' placeHolder="Enter item tax" label="Tax" control={control} />
                            <TextInput name='type1' placeHolder="Enter type of item" label="Type1" control={control} />
                            <TextInput name='type2' placeHolder="Is item veg/non-veg" label="Veg/Non-Veg" control={control} />
                            <IonButton type="submit">Add Item +</IonButton>
                        </form>
                    </div>
                    <div className="admin-row">
                        <div className="item-add-form-text">
                            <h1><b>Change item {iid != -1 && iid}</b></h1>
                        </div>
                        { iid != -1 && 
                            <form className='item-add-form-2' onSubmit={handleSubmit(changeItem)}>
                                <TextInput name='name' placeHolder="Enter item name" label="Name" control={control} />
                                <TextInput name='price' placeHolder="Enter item price" label="Price" control={control} />
                                <TextInput name='tax' placeHolder="Enter item tax" label="Tax" control={control} />
                                <TextInput name='type1' placeHolder="Enter type of item" label="Type1" control={control} />
                                <TextInput name='type2' placeHolder="Is item veg/non-veg" label="Veg/Non-Veg" control={control} />
                                <IonButton type="submit">Change Item</IonButton>
                            </form>
                        }
                    </div>
                </div>
                </div>
            </div>
        </IonPage>
    )
}

export default ItemList;