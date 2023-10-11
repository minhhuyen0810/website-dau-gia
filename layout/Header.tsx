import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { KeyConfigLocal } from '../api/configs';

import { CategoryInterface } from '../model/category';
import {
  URL_ABOUT_US,
  URL_AUCTION,
  URL_NEWS,
  URL_PRODUCT,
  URL_ROOT,
} from './types/url.inteface';
import LoginModal from './components/LoginModal';

export interface ILanguage {
  code: string;
  name: string;
  flag: string;
}

interface IHeader {
  isScroll: boolean;
}

const Header: FC<IHeader> = ({ isScroll }) => {
  const router = useRouter();

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
        <LoginModal />
      </div>
    </div>
  );
};

export default Header;
