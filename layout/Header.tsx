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
import { URL_ROOT } from './types/url.inteface';

export interface ILanguage {
  code: string;
  name: string;
  flag: string;
}

interface IHeader {
  isScroll: boolean;
  categories: CategoryInterface[] | null;
}

const { Search } = Input;

const Header: FC<IHeader> = ({ isScroll, categories }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
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

  const onSearch = (value: string) => console.log(value);

  // EFFECT
  useEffect(() => {
    const currentLanguageCode = localStorage.getItem(KeyConfigLocal.LANGUAGE);
    const currentLanguage = languages.find(
      (language) => language.code === currentLanguageCode
    );
    if (currentLanguage) {
      setLanguageSelected(currentLanguage);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('click', () => setActiveSearch(false));
    return () => {
      window.removeEventListener('scroll', () => setActiveSearch(false));
    };
  }, [typeof window]);

  return (
    <div className={`header container ${isScroll && 'scroll-sticky'}`}>
      <a className="logo" href={URL_ROOT}>
        <Image src="/img/logo_white.png" alt="logo" width={100} height={75} />
      </a>
      <div className="list-menu">
        {categories &&
          categories.length > 0 &&
          categories.map((category: CategoryInterface) => {
            return category.slug === '/contact' ? (
              <Button
                className="menu-item btn-common primary contact"
                onClick={() => router.push(`/${category.slug}`)}
                key={category.id}
                id={`btn-${category.slug}`}
                aria-label="Button category"
              >
                {category.title}
              </Button>
            ) : (
              <div className="menu-item" key={category.id}>
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
                  >
                    {category.title}
                  </a>
                )}

                {category.children && (
                  <ul className="sub-menu">
                    {category.children.map(
                      (child: CategoryInterface, index) => (
                        <li
                          className={`sub-menu-item ${
                            index === 0 ? 'active' : ''
                          }`}
                          key={child.id}
                        >
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

                          {/* <ul className="child__sub-menu">
                            <li className="child__sub-menu-item">hihi</li>
                            <li className="child__sub-menu-item">hihi2</li>
                          </ul> */}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        <div className="menu-item language" onClick={() => onChangeLanguage()}>
          <span>{languageSelected.name}</span>
        </div>
        <div className={`menu-item search ${activeSearch ? 'active' : ''}`}>
          <SearchOutlined onClick={toggleSearch} className="icon-search" />
          <Search
            placeholder="Search ..."
            onSearch={onSearch}
            className="input-search"
            size="large"
            enterButton={<SearchOutlined className="btn-icon-search" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
