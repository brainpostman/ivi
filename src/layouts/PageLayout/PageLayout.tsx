import Footer from '@/components/LayoutElements/Footer/Footer';
import HeadModif from '@/components/HeadModif/HeadModif';
import Header from '@/components/LayoutElements/Header/Header';
import { IHead } from '@/types/head.interface';
import style from './PageLayout.module.scss';
import { FC, PropsWithChildren } from 'react';
import { useSessionRefresh } from '@/hooks/useSessionRefresh';

const PageLayout: FC<PropsWithChildren<IHead>> = ({ children, ...props }) => {
    useSessionRefresh();

    return (
        <>
            <HeadModif {...props} />
            <div className={style.wrapper}>
                <Header />
                <main className={style.container}>{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default PageLayout;
