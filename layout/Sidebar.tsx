import {
  CloseOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { CategoryInterface } from '../model/category';
import { ILanguage } from './Header';
import { URL_AUCTION, URL_PRODUCT, URL_ROOT } from './types/url.inteface';
import setLanguage from 'next-translate/setLanguage';
import { KeyConfigLocal } from '../api/configs';

const { Search } = Input;

const SideBar: FC<{}> = ({}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [activeSearch, setActiveSearch] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number>(-1);
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  const router = useRouter();

  // RENDER
  const Title = (
    <div className="asidebar-drawer-title">
      <Button
        className="btn-close-sidebar"
        onClick={toggleSideBar}
        id="btn-toggleSideBar"
        aria-label="Button toggle sidebar"
      >
        <CloseOutlined />
      </Button>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="logo">
        <a href="/">
          <Image
            src="/img/logo-dau-gia-lac-viet.png"
            alt="logo"
            width={86}
            height={60}
          />
        </a>
      </div>
      <div className="sidebar-right">
        <button
          id="nav-icon"
          aria-label="Button nav"
          className={`${showSidebar ? 'open' : ''}`}
          onClick={toggleSideBar}
        >
          <div className="wrap-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      <Drawer
        placement="right"
        title={Title}
        footer={null}
        width="320"
        closable={false}
        onClose={toggleSideBar}
        visible={showSidebar}
        className="asidebar-drawer"
      >
        <div className="list-menu">
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
        <div className="menu-item">
          <Link
            href={{
              pathname: URL_AUCTION,
            }}
            as={URL_AUCTION}
            shallow={true}
          >
            <a
              className={`header-link ${
                router.pathname === URL_AUCTION ? 'active' : ''
              }`}
            >
              Cuộc đấu giá
            </a>
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
