import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

type EmailProps = {
  label: string,
  value: string
}

export const Email = ({
  label,
  value
}: EmailProps) => {
  const [email, setEmail] = useState(value);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setEmail(value);
  }, [value])

  const handleEmailChange = (text: string) => {
    setEmail(text);

    if(text.trim() === ''){
      setErrMsg('Поле не должно быть пустым');
      setError(true);
    }else if(!text.includes('@') || (!text.includes('.com'))){
      setErrMsg('Не валидная email-почта');
      setError(true);
    }else{
      setError(false);
    }
  }

  return (
    <View>
      <TextInput 
        label={label}
        mode="outlined"
        value={email}
        keyboardType="email-address"
        onChangeText={handleEmailChange}
        error={error}
      />
      {error && (<Text style={{color: 'red', margin: 4}}>{errMsg}</Text>)}
    </View>
  )
}