import HeaderIconButton from '@/components/UI/HeaderIconButton/HeaderIconButton';
import SubscribeButton from '@/components/UI/SubscribeButton/SubscribeButton';
import { IHeaderTab } from '@/types/header.interface';
import { FC, useEffect, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';

import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { useRouter } from 'next/router';
import style from './HeaderRightSide.module.scss';
import Switch from '@/components/UI/Switch/Switch';
import { useTranslation } from 'next-i18next';

interface IProps {
    showHoverBlock: (tab: IHeaderTab) => void;
}

const HeaderRightSide: FC<IProps> = ({ showHoverBlock }) => {
    const classNamePersonIcon = `text ${style.person_icon}`;

    const [isViewSubscribeButton, setIsViewSubscribeButton] = useState(true);

    const router = useRouter();
    const { pathname, asPath, query } = router;

    const { t } = useTranslation('header');

    useEffect(() => {
        if (pathname === '/') {
            setIsViewSubscribeButton(true);
            return;
        }
        setIsViewSubscribeButton(false);
    }, [pathname]);

    const onToggleLanguageClick = (newLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <article className={style.wrapper}>
            {isViewSubscribeButton ? (
                <SubscribeButton>{t('right-side.titles.buy-sub')}</SubscribeButton>
            ) : (
                <HighlightButton
                    className={style.highlight_button}
                    onMouseEnter={() => showHoverBlock('watch')}>
                    {t('right-side.titles.watch-30-days')}
                </HighlightButton>
            )}
            <HeaderIconButton icon='search'>{t('right-side.titles.search')}</HeaderIconButton>
            <HeaderIconButton icon='notification' />
            <IoPersonOutline
                className={classNamePersonIcon}
                onMouseEnter={() => showHoverBlock('profile')}
            />
            <Switch
                left={'РУ'}
                right={'EN'}
                startLeft={router.locale === 'ru'}
                callbackLeft={() => {
                    onToggleLanguageClick('ru');
                }}
                callbackRight={() => {
                    onToggleLanguageClick('en');
                }}
            />
        </article>
    );
};

export default HeaderRightSide;
