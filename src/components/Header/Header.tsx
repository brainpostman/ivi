import { IHeaderBlock, IHeaderTab } from '@/types/header.interface';
import { useState } from 'react';
import style from './Header.module.scss';
import HeaderHoverBlock from './HeaderHoverBlock/HeaderHoverBlock';
import HeaderLeftSide from './HeaderLeftSide/HeaderLeftSide';
import HeaderRightSide from './HeaderRightSide/HeaderRightSide';
import AuthModal from '../AuthModal/AuthModal';
import { useTypedSelector } from '@/hooks/ReduxHooks';

const Header = () => {
    const [hoverTabs, setHoverTabs] = useState<IHeaderBlock>({
        isShow: false,
        tab: undefined,
    });

    const { showAuthModal } = useTypedSelector((state) => state.authModal);

    const classNameContainer =
        hoverTabs.isShow && hoverTabs.tab ? `${style.container} ${style.effect}` : style.container;

    const showHoverBlock = (tab: IHeaderTab) => {
        setHoverTabs({ isShow: true, tab });
    };

    const hideHoverBlock = () => {
        setHoverTabs((prev) => ({ ...prev, isShow: false }));
    };

    return (
        <header className={style.wrapper}>
            <section className={classNameContainer} onMouseLeave={hideHoverBlock}>
                <HeaderLeftSide showHoverBlock={showHoverBlock} />
                <HeaderRightSide showHoverBlock={showHoverBlock} />
                {hoverTabs.isShow && hoverTabs.tab && (
                    <HeaderHoverBlock hideHoverBlock={hideHoverBlock} tab={hoverTabs.tab} />
                )}
            </section>
            {showAuthModal && <AuthModal modalShown={showAuthModal} />}
        </header>
    );
};

export default Header;
