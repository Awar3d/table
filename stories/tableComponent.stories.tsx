import { Meta, StoryObj } from '@storybook/react-native';

import { TableComponent } from './tableComponent';

const meta = {
  title: 'Example/TableComponent',
  component: TableComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof TableComponent>;

export default meta;

type TableComponent = StoryObj<typeof meta>;

export const TableComponentClassic: TableComponent = {
  args: {

  }
}
