import { DetailedHTMLProps, FC, HTMLAttributes, KeyboardEvent, useEffect, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import style from './ModalWindow.module.scss';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    isShow: boolean;
    closeFunc: () => void;
    className?: string;
}

const ModalWindow: FC<IProps> = ({
    children,
    isShow,
    closeFunc,
    className: propsClassName = '',
    ...props
}) => {
    const modalRef = useRef<HTMLElement>(null);
    const onKeyPressEsc = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Escape') closeFunc();
    };

    useEffect(() => {
        if (isShow) {
            // if (modalRef.current) {
            //     modalRef.current.style.top = window.scrollY + 'px';
            // }
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isShow]);

    return (
        <section
            className={`${style.wrapper} ${!isShow ? style.hide : ''} ${propsClassName}`}
            ref={modalRef}
            {...props}>
            <IoCloseOutline className={style.close_icon} onClick={closeFunc} />
            {children}
        </section>
    );
};
export default ModalWindow;
