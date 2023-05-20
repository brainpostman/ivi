import PageLayout from '@/layouts/PageLayout/PageLayout';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps = async ({ locale, params }: GetServerSidePropsContext) => {
    if (!params || !parseInt(params.id as string)) {
        return {
            redirect: {
                destination: '/error',
                permanent: false,
            },
        };
    }
    
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
    return <PageLayout title={'review'}>
        
    </PageLayout>;
};

export default Review;
