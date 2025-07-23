import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutChangeEvent,
} from 'react-native';

type DropdownProps = {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  mode: 'read' | 'write';
  value: string
};

export const MyDropDown = ({
  options,
  onSelect,
  placeholder = 'Выбрать..',
  mode,
  value
}: DropdownProps) => {
  const [selected, setSelected] = useState<string | null>(value);
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const isRead = mode === 'read';

  const onLayout = (event: LayoutChangeEvent) => {
    const { height, y, x, width } = event.nativeEvent.layout;
    setDropdownTop(y + height);
    setDropdownLeft(x);
    setDropdownWidth(width);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.wrapper}
        onLayout={onLayout}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(!visible)}
          disabled={isRead}
        >
           <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{selected || placeholder}</Text>
            <Text style={styles.arrow}>▼</Text>
          </View>
        </TouchableOpacity>
      </View>

      {visible && !isRead && (
        <View style={[styles.dropdown, {
          position: 'absolute',
          top: dropdownTop,
          left: dropdownLeft,
          width: dropdownWidth,
          zIndex: 1
        }]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
  },
  wrapper: {
    zIndex: 1,
  },
  button: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  arrow: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  dropdown: {
    borderRadius: 8,
    maxHeight: 200,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
});
