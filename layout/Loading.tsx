import { Spin } from 'antd';

export interface IPropsLoading {
  show: boolean;
}
const Loading = (props: IPropsLoading) => {
  const { show } = props;
  return show ? (
    <div className="loading">
      <Spin />
    </div>
  ) : null;
};

export default Loading;
