import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};

export default function Admin() {
    const { t } = useTranslation();
    return <AdminLayout title={t('html-title')}>
        
    </AdminLayout>;
}
