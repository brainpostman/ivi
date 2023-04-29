import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import style from './ViewMoreButton.module.scss';
import { useTranslation } from 'next-i18next';

const ViewMoreButton: FC<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => {
    const { t } = useTranslation('movies');

    return (
        <button className={style.button} {...props}>
            {children || t('show-more')}
        </button>
    );
};

export default ViewMoreButton;
