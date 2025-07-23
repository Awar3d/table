import { Linking, Text, View } from "react-native";
import { value, clientData } from "./utils/datas";
import { DataTable } from "react-native-paper";
import { z, ZodError } from "zod";
import { useMemo } from "react";

const valueSchemaShape: Record<string, z.ZodTypeAny> = {};

clientData.forEach((field) => {
  switch (field.type) {
    case "phone":
      valueSchemaShape[field.name] = z
        .string()
        .regex(/^\+?\d{10,15}$/, {
          message: "Некорректный номер телефона",
        })
        .optional();
      break;

    case "email":
      valueSchemaShape[field.name] = z
        .string()
        .email({ message: "Некорректный email адрес" })
        .optional();
      break;

    case "text":
    default:
      valueSchemaShape[field.name] = z
        .string()
        .min(1, { message: "Поле не должно быть пустым" })
        .optional();
      break;
  }
});

const rowSchema = z.object(valueSchemaShape);
const tableDataSchema = z.array(rowSchema);

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

  const parsed = useMemo(() => tableDataSchema.safeParse(value), [value]);

  const fieldErrors = useMemo(() => {
  if (!parsed.success) {
    const errorMap: Record<number, Record<string, string>> = {};
    const zodError = parsed.error as ZodError;

    zodError.issues.forEach((err: z.ZodIssue) => {
      const path = err.path;
      if (path.length === 2) {
        const [rowIndex, fieldName] = path;
        if (typeof rowIndex === "number" && typeof fieldName === "string") {
          if (!errorMap[rowIndex]) errorMap[rowIndex] = {};
          errorMap[rowIndex][fieldName] = err.message;
        }
      }
    });

    return errorMap;
  }

  return {};
}, [parsed]);

  return (
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
            const error = fieldErrors?.[rowIndex]?.[field.name];

            return (
              <DataTable.Cell key={field.name}>
                <View style={{ flexDirection: "column" }}>
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
                  {error && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {error}
                    </Text>
                  )}
                </View>
              </DataTable.Cell>
            );
          })}
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
