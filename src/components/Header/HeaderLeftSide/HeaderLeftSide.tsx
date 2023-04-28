import { IHeaderTab } from '@/types/header.interface';
import Image from 'next/image';
import Link from 'next/link';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import style from './HeaderLeftSide.module.scss';
import { useTranslation } from 'next-i18next';

const logoSrc =
    'https://solea-parent.dfs.ivi.ru/picture/ea003d,ffffff/reposition_iviLogoPlateRounded.svg';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    showHoverBlock: (tab: IHeaderTab) => void;
}

const HeaderLeftSide: FC<IProps> = ({ showHoverBlock, ...props }) => {
    const { t } = useTranslation();

    return (
        <article className={style.wrapper} {...props}>
            <Link href='/' className={style.logo}>
                <Image src={logoSrc} alt='logo' width={66} height={72} />
            </Link>

            <nav className={style.nav}>
                <Link href='/'>Мой Иви</Link>
                <Link href='/' onMouseEnter={() => showHoverBlock(undefined)}>
                    Что нового
                </Link>
                <Link href='/movies' onMouseEnter={() => showHoverBlock('movies')}>
                    Фильмы
                </Link>
                <Link href='/' onMouseEnter={() => showHoverBlock('series')}>
                    Сериалы
                </Link>
                <Link href='/' onMouseEnter={() => showHoverBlock('cartoons')}>
                    Мультфильмы
                </Link>
                <Link href='/' onMouseEnter={() => showHoverBlock('TV+')}>
                    TV+
                </Link>
            </nav>
        </article>
    );
};

export default HeaderLeftSide;
