import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { selectLanguageList } from '@/redux/github/selectors';

const LanguageSelect = ({
  handleLanguageChange,
}: {
  handleLanguageChange: (value: string) => void;
}) => {
  const languageList = useSelector(selectLanguageList);

  return (
    <Select defaultValue="all" className="actionSelect" onChange={handleLanguageChange}>
      <Select.Option value="all">All Languages</Select.Option>
      {languageList.map((language: string) => (
        <Select.Option key={language} value={language}>
          {language || 'Unknow'}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;
