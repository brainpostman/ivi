import HeaderIconButton from '@/components/UI/HeaderIconButton/HeaderIconButton';
import SubscribeButton from '@/components/UI/SubscribeButton/SubscribeButton';
import { IHeaderTab } from '@/types/header.interface';
import { FC, useEffect, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';

import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { useRouter } from 'next/router';
import style from './HeaderRightSide.module.scss';
import Switch from '@/components/UI/Switch/Switch';

interface IProps {
    showHoverBlock: (tab: IHeaderTab) => void;
}

const HeaderRightSide: FC<IProps> = ({ showHoverBlock }) => {
    const classNamePersonIcon = `text ${style.person_icon}`;

    const [isViewSubscribeButton, setIsViewSubscribeButton] = useState(true);

    const { pathname } = useRouter();

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
                <SubscribeButton>Оплатить подписку</SubscribeButton>
            ) : (
                <HighlightButton
                    className={style.highlight_button}
                    onMouseEnter={() => showHoverBlock('watch')}>
                    Смотреть 30 дней за 1 ₽
                </HighlightButton>
            )}
            <HeaderIconButton icon='search'>Поиск</HeaderIconButton>
            <HeaderIconButton icon='notification' />
            <IoPersonOutline
                className={classNamePersonIcon}
                onMouseEnter={() => showHoverBlock('profile')}
            />
            <Switch left={'РУ'} right={'EN'} />
        </article>
    );
};

export default HeaderRightSide;
