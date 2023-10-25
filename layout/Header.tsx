import {
  LockOutlined,
  LoginOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Input, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { KeyConfigLocal } from '../api/configs';
import { URL_PRODUCT, URL_ROOT } from './types/url.inteface';
import { useAppSelector } from '../store/hook';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoAction, logOutAction } from '../store/slices/auth.slice';
import { useEffectOnce } from 'react-use';
import Avatar from './components/Avatar';

interface IHeader {
  isScroll: boolean;
}

const Header: FC<IHeader> = ({ isScroll }) => {
  const router = useRouter();
  const authReducer = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [accountData, setAccountData] = useState<any>();
  const [token, setToken] = useState<any>();
  const _logout = () => {
    dispatch(logOutAction() as any);
  };
  const _changePassword = () => {
    // dispatch(logOutAction() as any);
    console.log('change password');
  };
  const _goToUserInfo = () => {
    // dispatch(logOutAction() as any);
    console.log('thông tin tài khoản:', accountData);
  };
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<LoginOutlined style={{ color: 'red' }} rev={undefined} />}
        onClick={_logout}
      >
        <span className="text-red-600">Đăng Xuất</span>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<LockOutlined style={{ color: 'blue' }} rev={undefined} />}
        onClick={_logout}
      >
        <span className="text-blue-600">Đổi mật khẩu</span>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<UserOutlined style={{ color: 'green' }} rev={undefined} />}
        onClick={_goToUserInfo}
      >
        <span className="text-green-600">Thông tin cá nhân</span>
      </Menu.Item>
    </Menu>
  );
  //EFFECT
  useEffectOnce(() => {
    if (authReducer.id_token) {
      dispatch(getUserInfoAction() as any);
    }
  });
  useEffect(() => {
    if (authReducer.account && authReducer.id_token)
      setAccountData(authReducer.account);
    setToken(authReducer.id_token);
    console.log('accountData', token, accountData);
  }, [authReducer]);
  //FUNCTION

  return (
    <div className={`header padding-120 ${isScroll && 'scroll-sticky'}`}>
      <a className="logo" href={URL_ROOT}>
        <Image
          src="/img/logo-dau-gia-lac-viet.png"
          alt="logo"
          width={100}
          height={75}
        />
      </a>
      <div className="list-menu">
        <div className="menu-item">
          <Link
            href={{
              pathname: URL_PRODUCT,
            }}
            as={URL_PRODUCT}
            shallow={true}
          >
            <a
              className={`header-link ${
                router.pathname === URL_PRODUCT ? 'active' : ''
              }`}
            >
              Tài sản đấu giá
            </a>
          </Link>
        </div>
        {token ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <div className="menu-item">
              <Avatar username={accountData?.username} />
              {accountData?.username}
            </div>
          </Dropdown>
        ) : (
          <Button
            className="menu-item btn-common primary contact"
            onClick={() => router.push('/login')}
            aria-label="Button category"
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
