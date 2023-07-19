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
import { URL_ROOT } from './types/url.inteface';
import setLanguage from 'next-translate/setLanguage';
import { KeyConfigLocal } from '../api/configs';

const { Search } = Input;

const SideBar: FC<{ categories: CategoryInterface[] | null }> = ({
  categories,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const languages: ILanguage[] = [
    {
      code: 'vi',
      name: 'VI',
      flag: '',
    },
    {
      code: 'en',
      name: 'EN',
      flag: '',
    },
  ];

  const [languageSelected, setLanguageSelected] = useState<ILanguage>(
    languages[0]
  );
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number>(-1);
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  const router = useRouter();

  useEffect(() => {
    const currentLanguageCode = localStorage.getItem(KeyConfigLocal.LANGUAGE);
    const currentLanguage = languages.find(
      (language) => language.code === currentLanguageCode
    );
    if (currentLanguage) {
      setLanguageSelected(currentLanguage);
    }
  }, []);

  const onChangeLanguage = () => {
    const language = languages.find((it) => it.name !== languageSelected.name);
    if (language) {
      setLanguage(language.code);
      setLanguageSelected(language);
      localStorage.setItem(KeyConfigLocal.LANGUAGE, language.code);
      router.reload();
    }
  };

  const toggleSearch = (e: any) => {
    e.stopPropagation();
    setActiveSearch(!activeSearch);
  };

  const toggleMenuItem = (index: number) => {
    setActiveMenu(index === activeMenu ? -1 : index);
  };

  const onSearch = (value: string) => console.log(value);

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
          <Image src="/img/logo_white.png" alt="logo" width={86} height={60} />
        </a>
      </div>
      <div className="sidebar-right">
        <div className="menu-item language" onClick={() => onChangeLanguage()}>
          <span>{languageSelected.name}</span>
        </div>
        <div className={`search ${activeSearch ? 'active' : ''}`}>
          <SearchOutlined onClick={toggleSearch} className="icon-search" />
          <Search
            placeholder="Search ..."
            onSearch={onSearch}
            className="input-search"
            size="large"
            enterButton={<SearchOutlined className="btn-icon-search" />}
          />
        </div>
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
          {categories &&
            categories.map((category, index) => (
              <React.Fragment key={category.id}>
                <div
                  className={`menu-item ${
                    activeMenu === index ? 'active' : ''
                  }`}
                  key={category.id}
                >
                  {category.slug !== '/product' ? (
                    <Link
                      href={{
                        pathname: category.slug ? category.slug : URL_ROOT,
                        query: { id: category.id },
                      }}
                      as={category.slug ? category.slug : URL_ROOT}
                      shallow={true}
                    >
                      <a
                        className={`header-link ${
                          router.pathname ===
                          (category.slug ? category.slug : URL_ROOT)
                            ? 'active'
                            : ''
                        }`}
                      >
                        {category.title}
                      </a>
                    </Link>
                  ) : (
                    <a
                      className={`header-link ${
                        router.pathname ===
                        (category.slug ? category.slug : URL_ROOT)
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => toggleMenuItem(index)}
                    >
                      {category.title}
                    </a>
                  )}

                  {category.children && category.children.length > 0 && (
                    <div
                      className="menu-item-right"
                      onClick={() => toggleMenuItem(index)}
                    >
                      <RightOutlined className="icon" />
                    </div>
                  )}
                </div>
                {category.children && (
                  <ul
                    className={`sub-menu ${
                      activeMenu === index ? 'active' : ''
                    }`}
                  >
                    {category.children.map((child) => (
                      <li className="sub-menu-item" key={child.id}>
                        {category.slug === '/product' ? (
                          <Link
                            href={{
                              pathname: `${category.slug}`,
                              query: { id: child.id },
                            }}
                          >
                            {child.title}
                          </Link>
                        ) : (
                          <a href={`${category.slug}#${child.slug}`}>
                            {child.title}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
