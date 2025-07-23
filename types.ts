import type { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
import { z } from 'zod';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

export interface WhereCondition {
  field: string;
  value: string | number | boolean;
  from?: string;
}

export interface StatusOption {
  value: string;
  editableBy: string[];
  visibleBy: string[];
}

//todo разделить разные фильтры на разные типы, пример type SearchFilter { searchTermKeys:string[] }
//и объединять их в один тип

/**
 * Интерфейс фильтра, используемого для отображения и фильтрации данных.
 */
export interface Filter {
  /** Название поля, по которому применяется фильтрация (например, "status" или "createdAt"), в search filter никак не участвует */
  field: string;

  /** Человекочитаемое название фильтра (отображается в UI) */
  label: string;

  /** Тип фильтра: "date" — для выбора даты, "search" — для ввода текста */
  type: "date" | "search";

  /** Значение фильтра (может быть строкой, датой или другим типом в зависимости от типа фильтра) */
  value?: any;

  /** Ключи по которым будет делаться поиск, если тип фильтра - search */
  searchTermKeys?: string[];
}

export type Filters = Filter[];

export interface Screen {
  name: string;
  type: "board" | "list" | "chat" | "form" | "reports" | "calendarOptions";
  collection: string;
  roles: string[];
  icon?: string;
  onlyCompany?: boolean;
  where?: WhereCondition[];
  presentation?: "list" | "table";
  lazy?: boolean;
  showAdd?: string[];
  orderBy?: string[];
  filters?: Filters;
  defaultPresentation?: "horizontal" | "table";
  statusOptions?: StatusOption[];
}

export type FieldType =
  | "text"
  | "email"
  | "url"
  | "password"
  | "phone"
  | "textarea"
  | "dropdown"
  | "numberId"
  | "collectionPicker"
  | "mechanicPicker"
  | "testPicker"
  | "paymentsForm"
  | "calculated"
  | "status"
  | "datePicker"
  | "file"
  | "number"
  | "otp"
  | "signature"
  | "rating"
  | "color"
  | "location"
  | "reference"
  | "dateTime"
  | "segmentedButtons"
  | "booleanCheckbox";

export interface Field {
  disableSearch?: boolean;
  objectFields?: string[];
  name: string;
  type: FieldType;
  label: string;
  list: string[];
  form?: string[];
  formCreate?: string[];
  formEdit?: string[];
  board?: string[];
  required?: boolean;
  variant?: VariantProp<any>;
  options?: string[];
  defaultValue?: string | boolean;
  collection?: string;
  key?: string;
  secondKey?: string;
  thirdKey?: string;
  multiselect?: boolean;
  showAdd?: string[];
  onlyId?: boolean;
  onlyCompany?: boolean;
  where?: WhereCondition[];
  readOnly?: boolean;
  width?: number;
  calculation?: {
    formula: string;
    dependencies: string[];
  };
  validation?: z.ZodTypeAny; 
  description?: string;
  statusOptions?: StatusOption[];
  relatedObject?: {
    collection: string;
    key: string;
    secondKey: string;
    multiselect?: boolean;
    countTotal?: boolean;
    formula?: string;
    where?: WhereCondition[];
  };
  hideLabel?: boolean;
  autoFocus?: boolean;
  useUserValue?: boolean;
  allowCustomInput?: boolean;
}

export interface Collection {
  name: string;
  fields: Field[];
  uniqIdNumber?: boolean;
  hideAdd?: boolean;
  defaultFields?: { name: string; key: string }[];
  filters?: Filter[];
  deletableBy?: string[];
}

export interface Database {
  collections: Collection[];
}

export interface Config {
  appName: string;
  employeesVisibleTo?: string[];
  employeesEditableBy?: string[];
  roles: string[];
  screens: Screen[];
  database: Database;
  defaultRole?: string;
  theme: Theme;
  statuses?: string[];
  mainCollection: string;
}

export type RentalPoint = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export interface Tool {
  name: string;
  sku: string;
  inventoryNumber: string;
  rentalPoint: string;
  status: string;
  category: string;
  description: string;
  depositAmount: string;
  purchasePrice: string;
  price: string;
  userId: string;
  id: string;
  companyId: string;
}

export interface Client {
  name: string;
  phone: string;
  id: string;
}

export type JoinRequest = {
  id: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  status: "ACCEPTED" | "DECLINED" | "PENDING";
  userId: string;
};

export interface Section {
  title: string;
  data: any[];
}

export interface IntechTask {
  id: string;
  installationDate?: {
    toDate: () => Date;
  };

  [key: string]: any;
}