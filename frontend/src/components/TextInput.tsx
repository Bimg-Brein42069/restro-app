import React, { FC } from "react";
import { IonItem, IonInput } from "@ionic/react";
import { Controller, Control } from "react-hook-form";

export interface InputProps {
  name: string;
  placeHolder: string;
  label: string;
  control?: Control;
}

const TextInput: FC<InputProps> = ({ name, placeHolder, label, control }) => {
  return (
    <IonItem className="border-2 border-solid border-black my-3">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <IonInput 
            value={field.value} 
            onIonChange={e => field.onChange(e.detail.value)} 
            placeholder={placeHolder}
            label={label}
            labelPlacement='floating'
            type={(label=='Password')?'password':'text'}
          />
        )}
      />
    </IonItem>
  );
};

export default TextInput;
