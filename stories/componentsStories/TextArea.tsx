import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';

interface TextAreaProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  state: 'read' | 'write';
}

export const TextAreaField = ({
  label,
  placeholder = '',
  value = '',
  onChange = () => {},
  state
}: TextAreaProps) => {
  const [text, setText] = useState(value);
  const [error, setError] = useState(false);

  useEffect(() => {
    setText(value);
  }, [value])

  const handleChange = (input: string) => {
    setText(input);
    if(input.trim() === ''){
      setError(true);
    }else{
      setError(false);
    }
    onChange(input);
  };
  const isRead = state === 'read';

  return (
    <View style={{ marginVertical: 8 }}>
      <TextInput
        label={label}
        value={text}
        disabled={isRead}
        error={error}
        onChangeText={handleChange}
        mode="outlined"
        placeholder={placeholder}
        multiline
        numberOfLines={4}
        style={{ height: 120, textAlignVertical: 'top', fontSize: 16 }}
      />
      {error && <Text style={{ color: 'red', marginTop: 4 }}>Поле не должно быть пустым</Text>}
    </View>
  );
};
