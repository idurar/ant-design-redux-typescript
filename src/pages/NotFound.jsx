import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

const NotFound = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate('/notfound');
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button href="/" type="primary">
          Back Home
        </Button>
      }
    />
  );
};
export default NotFound;
