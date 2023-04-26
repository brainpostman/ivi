import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import style from './HighlightButton.module.scss';

const HighlightButton: FC<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className: propsClassName, ...props }) => {
    return (
        <button className={`${propsClassName} ${style.button}`} {...props}>
            {children}
        </button>
    );
};

export default HighlightButton;
