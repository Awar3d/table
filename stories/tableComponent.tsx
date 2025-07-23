import { Linking, Text } from "react-native";
import { value, clientData } from "./data/datas";
import { DataTable } from "react-native-paper";

export const TableComponent = () => {
  const rows = Object.keys(value[0]);

  const fields = clientData
    .filter((field) => rows.includes(field.name))
    .map((field) => ({
        label: field.label,
        name: field.name,
        type: field.type,
    }));

  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return(
    <DataTable>
      <DataTable.Header>
        {fields.map((field) => (
          <DataTable.Title key={field.name}>
            {field.label}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {value.map((item, rowIndex) => (
        <DataTable.Row key={rowIndex}>
          {fields.map((field) => {
            const cellValue = item[field.name as keyof typeof item];

            return (
              <DataTable.Cell key={field.name}>
                {field.type === "phone" && cellValue ? (
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() => handlePhonePress(cellValue as string)}
                  >
                    {cellValue}
                  </Text>
                ) : (
                  <Text>{cellValue || ""}</Text>
                )}
              </DataTable.Cell>
            );
          })}
        </DataTable.Row>
      ))}
    </DataTable>
  )
}