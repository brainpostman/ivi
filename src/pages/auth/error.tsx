import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import styles from './error.module.scss';
import { normalizeKey } from '@/utils/normalize.utils';
import { useRouter } from 'next/router';
import PageLayout from '@/layouts/PageLayout/PageLayout';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', [
                'error',
                'header',
                'footer',
                'common',
                'auth_modal',
            ])),
        },
    };
};

export default function AuthError() {
    const { t } = useTranslation('error');

    const router = useRouter();

    const { error } = router.query;

    return (
        <PageLayout title={t('html-title')}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{t('error')}</h1>
                    <h2 className={styles.subtitle}>
                        {t([normalizeKey(`auth-errors.${error}`), 'auth-errors.Default'])}
                    </h2>
                </div>
            </div>
        </PageLayout>
    );
}
