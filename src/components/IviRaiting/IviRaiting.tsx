import { FC } from 'react';
import SimpleButton from '../UI/Buttons/SimpleButton/SimpleButton';
import style from './IviRaiting.module.scss';
import { useTranslation } from 'next-i18next';

interface IProps {
    scoreAVG: number | null;
    countScore: number;
}

const IviRaiting: FC<IProps> = ({ scoreAVG, countScore }) => {
    const { t } = useTranslation('watch', { keyPrefix: 'ivi-rating' });
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_rating}>
                <div className={style.raiting}>{scoreAVG ? scoreAVG.toFixed(2) : '-'}</div>
                <div className={style.raiting_info}>
                    <h1 className={style.raiting_info__title}>{t('ivi-rating')}</h1>
                    <h4 className={style.raiting_info__subtitle}>{t('interest')}</h4>
                    <h4 className={style.raiting_info__subtitle}>
                        {t('scored')} {countScore}
                    </h4>
                </div>
            </div>

            <SimpleButton>{t('score')}</SimpleButton>
        </div>
    );
};

export default IviRaiting;
