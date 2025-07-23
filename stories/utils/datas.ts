import { maxLength, minLength } from "zod";

const ROLES = {
  ADMIN: "admin",
  MECHANIC: "mechanic",
  ELECTRICIAN: "electrician",
  WHEEL_ALIGNMENT: "wheelAlignment",
  ENGINE_MECHANIC: "engineMechanic",
  TIRE_SERVICE: "tireService",
  GENERATOR: "generator_starter",
  STO: "STO",
};

const optionRoles = [
  ROLES.MECHANIC,
  ROLES.ELECTRICIAN,
  ROLES.WHEEL_ALIGNMENT,
  ROLES.ENGINE_MECHANIC,
  ROLES.TIRE_SERVICE,
  ROLES.GENERATOR,
  ROLES.STO,
];

export const greateValue = {
  fullName: 'Тарасов Василий',
  phone: '+77051528593',
  email: 'example@gmail.com',
  duration: '12',
  description: 'yeah',
  date: '02.11.25',
  role: 'Дөңгелектердің бұрылысы',
}

export const value = [
  {
    fullName: 'aaaa',
    phone: '+77051528593',
    email: 'examplegmail.com',
    role: 'mechanic',
  },
  {
    fullName: 'Иванов Владимир',
    phone: '+77051528593',
    email: 'example@gmail.com',
    role: 'mechanic',
    description: 'aaaa',
  },
  {
    fullName: '',
    phone: '+77081920863',
    email: 'example@gmail.com',
    role: 'mechanic',
  },
  {
    fullName: 'Гарусов Василий',
    phone: '+77051528593',
    email: 'example@gmail.com',
    role: 'mechanic',
  }
]

export const clientData = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    list: [ROLES.ADMIN],
    form: [ROLES.ADMIN],
    board: [],
    min: 5,
    max: 100,
  },
  {
    name: "phone",
    type: "phone",
    label: "Phone Number",
    list: [ROLES.ADMIN],
    form: [ROLES.ADMIN],
    board: [],
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    list: [ROLES.ADMIN],
    form: [ROLES.ADMIN],
    board: [],
    required: false,
  },
  {
    name: "duration",
    type: "number",
    label: "Duration (hours)",
    list: [],
    form: [ROLES.ADMIN],
    board: [],
  },
  {
    name: "date",
    type: "datePicker",
    label: "Date",
    list: [ROLES.ADMIN],
    form: [ROLES.ADMIN],
    board: [ROLES.ADMIN],
    required: true,
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    list: [ROLES.ADMIN],
    form: [ROLES.ADMIN],
    board: [],
  },
  {
    name: "role",
    type: "dropdown",
    label: "Role",
    options: optionRoles,
    required: true,
    list: [ROLES.ADMIN],
    form: [ROLES.ADMIN],
    board: [],
  },
]