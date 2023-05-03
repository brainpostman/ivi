import AuthModal from '@/components/AuthModal/AuthModal';
import { useActions, useTypedSelector } from '@/hooks/ReduxHooks';
import AdminLayout from '@/layouts/BasicLayout/BasicLayout';
import SignToken, { GenDBPasswordMock } from '@/utils/auth.util';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', ['common', 'admin', 'auth_modal'])),
        },
    };
};

export default function Admin() {
    const { t } = useTranslation('admin');
    const { showAuthModal } = useTypedSelector((state) => state.authModal);
    const { setAuthModal } = useActions();

    const { data, status } = useSession();

    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <AdminLayout title={t('html-title')}>
            <div>
                {status === 'authenticated' ? (
                    <button onClick={() => signOut()}>Sign out</button>
                ) : (
                    <button onClick={() => setAuthModal(true)}>Sign in</button>
                )}

                <button onClick={() => {}}>data</button>
            </div>
            {showAuthModal && <AuthModal modalShown={showAuthModal} />}
        </AdminLayout>
    );
}
