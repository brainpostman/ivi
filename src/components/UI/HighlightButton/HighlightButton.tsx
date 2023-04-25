import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import style from './HighlightButton.module.scss';

const HighlightButton: FC<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => {
    return (
        <button className={style.button} {...props}>
            {children}
        </button>
    );
};

export default HighlightButton;
