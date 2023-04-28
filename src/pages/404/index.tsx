import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import style from './index.module.scss';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', ['header', 'auth_modal'])),
            // Will be passed to the page component as props
        },
    };
};

export default function Error() {
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <h1 className={style.title}>Ошибка</h1>
                <h2 className={style.subtitle}>Запрашиваемой страницы не существует</h2>
            </div>
        </div>
    );
}
