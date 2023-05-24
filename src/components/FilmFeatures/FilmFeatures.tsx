import Image from 'next/image';
import style from './FilmFeatures.module.scss';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';

interface IProps {
    className?: string;
}

const FilmFeatures: FC<IProps> = ({ className = '' }) => {
    const { t } = useTranslation('watch', { keyPrefix: 'film-features' });
    return (
        <div className={`${style.wrapper} ${className}`}>
            <div className={style.icon_fullhd}>
                <div className={style.icon_text}> FullHD </div>
            </div>
            <div className={style.control}>
                <Image src='/film/soundIcon.png' width={15} height={15} alt='звук рус' />
                <p>{t('rus')}</p>
            </div>
            <div className={style.control}>
                <Image src='/film/subtitleIcon.png' width={15} height={15} alt='суб рус' />
                <p>{t('rus')}</p>
            </div>
        </div>
    );
};

export default FilmFeatures;
