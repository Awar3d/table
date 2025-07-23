import { View, Text } from "react-native"
import { TextInput } from "react-native-paper";

import { PhoneNumber } from "./componentsStories/PhoneNumber";
import { MyDropDown } from './componentsStories/Dropdowns';
import { NumberInput } from './componentsStories/Numbers';
import { DatePicker } from './componentsStories/DataPicker';
import { TextAreaField } from './componentsStories/TextArea';
import React, { useState } from 'react';
import { greateValue } from "./utils/datas";
import { Email } from "./componentsStories/Email";

type Field = {
  name: string,
  type: string,
  label: string,
  options?: string[],
}

interface GreatComponentProps {
  mode: 'read' | 'write',
  data: Field[] // дата которая для компонентов
}

export const GreatComponent = ({ mode, data }: GreatComponentProps) => {
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});
  const [error, setError] = useState(false);
  const isRead = mode === 'read';

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if(value.trim() === ''){
      setError(true);
    }else{
      setError(false);
    }
  };

  const renderField = (field: Field) => {
  const rawValue =
    formValues[field.name] ??
    greateValue[field.name as keyof typeof greateValue] ??
    '';

  const fieldValue =
    field.name === 'phone' && typeof rawValue === 'string'
      ? `+7${rawValue.slice(1)}`
      : rawValue;

  if (isRead) {
    return (
      <Text style={{ fontSize: 16, paddingVertical: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>{field.label}: </Text>
        {fieldValue || '—'}
      </Text>
    );
  }

  switch (field.type) {
    case 'phone':
      return (
        <PhoneNumber
          label={field.label}
          placeholder={field.name}
          mode={mode}
          value={fieldValue}
        />
      );

    case 'text':
      return (
        <View>
          <TextInput
            label={field.label}
            mode="outlined"
            value={fieldValue}
            error={error}
            onChangeText={(text) => handleChange(field.name, text)}
          />
          {error && (<Text style={{ color: 'red', margin: 4}}>Поле не должно быть пустым</Text>)}
        </View>
      );

    case 'email':
      return (
        <Email 
          label={field.label}
          value={fieldValue}
        />
      )

    case 'dropdown':
      if (field.options) {
        return (
          <MyDropDown
            options={field.options}
            onSelect={(val) => handleChange(field.name, val)}
            mode={mode}
            value={fieldValue}
          />
        );
      }
      return null;

    case 'number':
      return (
        <NumberInput
          label={field.label}
          placeholder={field.name}
          mode={mode}
          valueToShow={fieldValue}
        />
      );

    case 'datePicker':
      return <DatePicker mode={mode} value={fieldValue}/>;

    case 'textarea':
      return (
        <TextAreaField
          label={field.label}
          mode={mode}
          value={fieldValue}
        />
      );

    default:
      return null;
  }
};


  return (
    <View style={{ padding: 20, display: 'flex', gap: 5 }}>
      {data.map((field) => (
        <View key={field.name} style={{ marginBottom: 16 }}>
          {renderField(field)}
        </View>
      ))}
    </View>
  );
};