import HeadModif from '@/components/HeadModif/HeadModif';
import { IHead } from '@/types/head.interface';
import { FC, PropsWithChildren } from 'react';
import style from './BasicLayout.module.scss';
import { useSessionRefresh } from '@/hooks/useSessionRefresh';

const BasicLayout: FC<PropsWithChildren<IHead>> = ({ children, ...props }) => {
    useSessionRefresh();

  return (
    <>
      <HeadModif {...props} />
      <div className={style.wrapper}>
        <main className={style.container}>{children}</main>
      </div>
    </>
  )
}

export default BasicLayout
