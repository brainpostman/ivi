import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import style from './Input.module.scss';

const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
    type = 'text',
    placeholder,
    ...props
}) => {
    const currentClassName = type === 'number' ? style.number : style.text;

    const handlePlaceholder = () => {};

    return (
        <label className={style.label}>
            <input type={type} className={`${style.input} ${currentClassName}`} {...props} />
            <span className={style.placeholder}>{placeholder ?? ''}</span>
        </label>
    );
};

export default Input;
