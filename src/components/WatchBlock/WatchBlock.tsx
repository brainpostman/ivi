import { useTranslation } from 'next-i18next';
import style from './WatchBlock.module.scss';

export default function WatchBlock() {
    const { t } = useTranslation('watch', { keyPrefix: 'watch-block' });
    return (
        <div className={style.wrapper}>
            <hr />
            <div className={style.wrapper_content}>
                <div className={style.content_tongth}>
                    <h3>{t('languages')}</h3>
                    <h4>{t('rus-eng')}</h4>
                </div>

                <div className={style.content_sub}>
                    <h3>{t('subs')}</h3>
                    <h4>{t('rus')}</h4>
                </div>

                <div className={style.content_remark}>
                    {t('pic-n-sound')}
                    <span>{t('pic-n-sound-descr')}</span>
                </div>

                <div className={style.content_icons}>
                    <div className={style.icon_4k}>
                        <div className={style.icon_text}> 4K </div>
                    </div>
                    <div className={style.icon_fullhd}>
                        <div className={style.icon_text}> FullHD </div>
                    </div>
                    <div className={style.icon_hd}>
                        <div className={style.icon_text}> HD </div>
                    </div>
                    <div className={style.icon_1080}>
                        <div className={style.icon_text}> 1080 </div>
                    </div>
                    <div className={style.icon_720}>
                        <div className={style.icon_text}> 720 </div>
                    </div>
                    <div className={style.icon_51}>
                        <div className={style.icon_text}> 5.1 </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}
