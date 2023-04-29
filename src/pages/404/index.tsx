import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import style from './index.module.scss';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', ['error404'])),
            // Will be passed to the page component as props
        },
    };
};

export default function Error() {
    const { t } = useTranslation('error404');

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <h1 className={style.title}>{t('error')}</h1>
                <h2 className={style.subtitle}>{t('message')}</h2>
            </div>
        </div>
    );
}
