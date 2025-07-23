import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaskedTextInput } from 'react-native-mask-text';

interface NumberInputProps {
  label: string;
  placeholder?: string;
  mode: 'read' | 'write';
  valueToShow: string;
}

export const NumberInput = ({ label, placeholder, mode, valueToShow }: NumberInputProps) => {
  const [error, setError] = useState(false);
  const isRead = mode === 'read';

  const handleChangeNumber = (rawText: string) => {
    if(rawText.trim() === ''){
      setError(true);
    }else{
      setError(false);
    }
  }

  return (
    <View>
      <TextInput
        label={label}
        value={valueToShow}
        disabled={isRead}
        mode="outlined"
        keyboardType="numeric"
        error={error}
        render={(props) => (
          <MaskedTextInput
            {...props}
            mask="9999999999"
            onChangeText={handleChangeNumber}
            placeholder={placeholder}
            style={props.style}
            keyboardType="numeric"
          />
        )}
      />
      {error && <Text style={{ color: 'red', marginTop: 4 }}>Поле не должно быть пустым</Text>}
    </View>
  );
};
