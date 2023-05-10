import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import styles from './error.module.scss';
import { normalizeKey } from '@/utils/normalize.utils';
import { useRouter } from 'next/router';
import PageLayout from '@/layouts/PageLayout/PageLayout';
import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import AuthWindow from '@/components/AuthWindow/AuthWindow';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps = async ({ req, res, locale }: GetServerSidePropsContext) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        return { redirect: { destination: '/' } };
    }

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
    const { t } = useTranslation();
    const router = useRouter();

    const { error } = router.query;

    return error ? (
        <PageLayout title={t('error:html-title')}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{t('error:error')}</h1>
                    <h2 className={styles.subtitle}>
                        {t([
                            normalizeKey(`error:signin-errors.${error}`),
                            'error:signin-errors.Default',
                        ])}
                    </h2>
                </div>
            </div>
        </PageLayout>
    ) : (
        <BasicLayout title={t('auth_modal:html-title')}>
            <AuthWindow />
        </BasicLayout>
    );
}
