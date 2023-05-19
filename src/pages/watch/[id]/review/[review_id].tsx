import PageLayout from '@/layouts/PageLayout/PageLayout';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps = async ({ locale, params }: GetServerSidePropsContext) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', [
                'header',
                'auth_modal',
                'common',
                'footer',
            ])),
        },
    };
};

const Review = () => {
    return <PageLayout title={'review'}>hello</PageLayout>;
};

export default Review;
