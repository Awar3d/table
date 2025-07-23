import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

type DatePickerProp = {
  mode: 'read' | 'write';
  value: string
};

export const DatePicker = ({ mode, value }: DatePickerProp) => {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const isRead = mode === 'read';

  return (
    <PaperProvider>
      <View style={styles.container}>
        {!isRead ? (
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={styles.selectButton}>
              {date ? date.toLocaleDateString('ru-RU') : value}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.selectButton, styles.disabled]}>
            {date ? date.toLocaleDateString('ru-RU') : 'Дата не выбрана'}
          </Text>
        )}

        <DatePickerModal
          locale="ru"
          mode="single"
          visible={open}
          date={date}
          onDismiss={() => setOpen(false)}
          onConfirm={(params) => {
            setOpen(false);
            setDate(params.date);
          }}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
  },
  selectButton: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#4f46e5',
    backgroundColor: '#eef2ff',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#e5e7eb',
    borderColor: '#d1d5db',
    color: '#6b7280',
  },
});
