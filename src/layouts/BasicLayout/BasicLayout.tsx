import HeadModif from '@/components/HeadModif/HeadModif';
import { IHead } from '@/types/head.interface';
import { FC, PropsWithChildren } from 'react';
import style from './BasicLayout.module.scss';
import { useSessionRefresh } from '@/hooks/useSessionRefresh';

const BasicLayout: FC<PropsWithChildren<IHead>> = ({
    title,
    description,
    keywords,
    noIndex,
    children,
}) => {
    useSessionRefresh();

    return (
        <>
            <HeadModif
                title={title}
                description={description}
                keywords={keywords}
                noIndex={noIndex}
            />
            <div className={style.wrapper}>
                <main className={style.container}>{children}</main>
            </div>
        </>
    );
};

export default BasicLayout;
