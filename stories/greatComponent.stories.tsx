import { Meta, StoryObj } from '@storybook/react-native';

import { GreatComponent } from './greatComponent';

import { clientData } from "./data/datas";

const meta = {
  title: 'Example/GreatComponent',
  component: GreatComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof GreatComponent>;

export default meta;

type GreatComponent = StoryObj<typeof meta>;

export const GreatComponentClassic: GreatComponent = {
  args: {
    state: 'read',
    data: clientData
  }
}