import { FC } from 'react';
import style from './HeaderMovieBlock.module.scss';

interface IProps {
    isShow?: boolean;
}

const HeaderMovieBlock: FC<IProps> = ({ isShow = true }) => {
    if (!isShow) return <></>;

    return <div className={style.wrapper}></div>;
};

export default HeaderMovieBlock;
