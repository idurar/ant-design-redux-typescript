import { Radio, RadioChangeEvent } from 'antd';

const FavorFilter = ({
  handleFavorChange,
  favorState,
}: {
  handleFavorChange: (e: RadioChangeEvent) => void;
  favorState: string;
}) => {
  return (
    <Radio.Group value={favorState} onChange={handleFavorChange}>
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="favored">Favored</Radio.Button>
      <Radio.Button value="unfavored">Unfavored</Radio.Button>
    </Radio.Group>
  );
};

export default FavorFilter;
