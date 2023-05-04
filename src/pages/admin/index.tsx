import AuthWindow from '@/components/AuthWindow/AuthWindow';
import { useActions, useTypedSelector } from '@/hooks/ReduxHooks';
import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import styles from './index.module.scss';
import { checkAdminRole, getSerializableSession } from '@/utils/auth.util';
import { Session, User } from 'next-auth';
import { useRouter } from 'next/router';

interface IAdminProps {
    authSession: Session;
}

export const getServerSideProps = async ({ locale, req, res }: GetServerSidePropsContext) => {
    const serverSession = await getServerSession(req, res, authOptions);
    const authSession = getSerializableSession(serverSession);
    // const response = await axios.get(
    //     `http://188.120.248.77/films?order=ASC&page=1&take=10&orderBy=name`
    // );
    // console.log(response.headers);
    if (!authSession || !(await checkAdminRole(authSession.accessToken))) {
        return { redirect: { destination: '/' } };
    }

    return {
        props: {
            authSession,
            ...(await serverSideTranslations(locale ?? 'ru', ['common', 'admin'])),
        },
    };
};

export default function Admin({ authSession }: IAdminProps) {
    const { t } = useTranslation('admin');
    const router = useRouter();

    useEffect(() => {
        if (!authSession) {
            router.push('/');
        }
        if (authSession) {
            // const fetch = async () => {
            //     const response = await axios.get(
            //         `http://188.120.248.77/films?order=ASC&page=1&take=10&orderBy=name`
            //     );
            //     console.log(response.headers);
            // };
            // fetch();
        }
    }, [authSession]);

    return (
        <BasicLayout title={t('html-title')}>
            <div>
                <button
                    onClick={() => {
                        signOut();
                    }}>
                    Sign out
                </button>
                <button
                    onClick={async () => {
                        await axios.get(`http://188.120.248.77/films`).then((resp) => {
                            console.log(resp);
                        });
                    }}>
                    here
                </button>
            </div>
        </BasicLayout>
    );
}
