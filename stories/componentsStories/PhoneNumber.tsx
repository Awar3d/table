import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaskedTextInput } from 'react-native-mask-text';

interface PhoneNumberProps {
  label: string;
  placeholder: string;
  mode: 'read' | 'write';
  value: string;
}

export const PhoneNumber = ({ label, placeholder, mode, value }: PhoneNumberProps) => {
  const [phone, setPhone] = useState(value);
  const [error, setError] = useState(false);
  const isRead = mode === 'read';

  const handlePhoneChange = (rawText: string) => {
    setPhone(rawText);

    if(rawText.trim() === ''){
      setError(true);
    }else {
      setError(false);
    }
  }

  return (
    <View>
      <TextInput
        label={label}
        value={value}
        disabled={isRead}
        mode="outlined"
        error={error}
        keyboardType="phone-pad"
        render={props => (
          <MaskedTextInput
            {...props}
            mask="+7 (999) 999-99-99"
            onChangeText={handlePhoneChange}
            placeholder={placeholder}
            style={props.style}
          />
        )}
      />
      {error && <Text style={{ color: 'red', marginTop: 4 }}>Поле не должно быть пустым</Text>}
    </View>
  );
};