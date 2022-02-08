import { Select } from 'antd';

const SortSelect = ({ handleSortChange }: { handleSortChange: (value: string) => void }) => {
  return (
    <Select defaultValue="desc" className="actionSelect" onChange={handleSortChange}>
      <Select.Option value={'desc'}>DESC</Select.Option>
      <Select.Option value={'asc'}>ASC</Select.Option>
    </Select>
  );
};

export default SortSelect;
