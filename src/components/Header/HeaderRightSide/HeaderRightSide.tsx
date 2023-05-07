import HeaderIconButton from '@/components/UI/HeaderIconButton/HeaderIconButton';
import SubscribeButton from '@/components/UI/SubscribeButton/SubscribeButton';
import { IHeaderTab } from '@/types/header.interface';
import { FC, useEffect, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';

import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { useRouter } from 'next/router';
import style from './HeaderRightSide.module.scss';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

interface IProps {
  showHoverBlock: (tab: IHeaderTab) => void;
}

const HeaderRightSide: FC<IProps> = ({ showHoverBlock }) => {
  const classNamePersonIcon = `text ${style.person_icon}`;

  const [isViewSubscribeButton, setIsViewSubscribeButton] = useState(true);

  const { pathname } = useRouter();

  const { t } = useTranslation('header', { keyPrefix: 'right-side.titles' });

  useEffect(() => {
    if (pathname === '/') {
      setIsViewSubscribeButton(true);
      return;
    }
    setIsViewSubscribeButton(false);
  }, [pathname]);

  return (
    <article className={style.wrapper}>
      {isViewSubscribeButton ? (
        <SubscribeButton>{t('buy-sub')}</SubscribeButton>
      ) : (
        <HighlightButton
          className={style.highlight_button}
          onMouseEnter={() => showHoverBlock('watch')}>
          {t('watch-30-days')}
        </HighlightButton>
      )}
      <HeaderIconButton icon='search'>{t('search')}</HeaderIconButton>
      <HeaderIconButton icon='notification' />
      <IoPersonOutline
        className={classNamePersonIcon}
        onMouseEnter={() => showHoverBlock('profile')}
      />
      <LanguageSwitcher />
    </article>
  );
};

export default HeaderRightSide;
