import { z, ZodTypeAny } from "zod";
import { clientData } from "./datas";
import { value } from './datas';

export const buildZodSchemaFromClientData = (data: typeof clientData) => {
  const shape: Record<string, ZodTypeAny> = {};

  data.forEach((field) => {
    const isRequired = field.required ?? false;
    let schema: ZodTypeAny;

    const fieldValue = value.find((v) => v.hasOwnProperty(field.name)) as Record<string, any>;
    const minLen = fieldValue?.minLength;
    const maxLen = fieldValue?.maxLength;

    switch (field.type) {
      case "text":
      case "textarea": {
        let stringSchema = z.string();
        if (minLen !== undefined) stringSchema = stringSchema.min(minLen);
        if (maxLen !== undefined) stringSchema = stringSchema.max(maxLen);
        schema = stringSchema;
        break;
      }

      case "email":
        schema = z.string().email("Неверный email");
        break;

      case "phone":
        schema = z
          .string()
          .regex(/^\+7\d{10}$/, "Неверный номер (пример: +77071234567)");
        break;

      case "number":
        schema = z
          .string()
          .refine(
            (val) => {
              const num = Number(val);
              if (isNaN(num)) return false;
              if (minLen !== undefined && num < minLen) return false;
              if (maxLen !== undefined && num > maxLen) return false;
              return true;
            },
            {
              message: `Число должно быть от ${minLen ?? "?"} до ${maxLen ?? "?"}`,
            }
          );
        break;

      case "datePicker":
        schema = z.string();
        break;

      case "dropdown":
        if (field.options && field.options.length > 0) {
          schema = z.enum(field.options as [string, ...string[]]);
        } else {
          schema = z.string();
        }
        break;

      default:
        schema = z.any();
        break;
    }

    shape[field.name] = isRequired ? schema : schema.optional();
  });

  return z.object(shape);
};
