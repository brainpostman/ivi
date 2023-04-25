import { DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import style from './Input.module.scss';

const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
    type = 'text',
    placeholder,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [focus, setFocus] = useState(false);

    const inputClassName = type === 'number' ? style.number : style.text;
    const placeholderType = type === 'number' ? style.placeholder__number : style.placeholder__text;
    const placeholderClassName = focus ? style.placeholder__text_active : '';

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('focus', () => {
                setFocus(true);
            });
            inputRef.current.addEventListener('blur', () => {
                if (inputRef.current?.value === '') {
                    setFocus(false);
                }
            });
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('focus', () => {
                    setFocus(true);
                });
                inputRef.current.removeEventListener('blur', () => {
                    if (inputRef.current?.value === '') {
                        setFocus(false);
                    }
                });
            }
        };
    }, []);

    return (
        <label className={style.label}>
            <input
                ref={inputRef}
                type={type}
                className={`${style.input} ${inputClassName}`}
                placeholder={type === 'number' ? placeholder : ''}
                {...props}
            />
            <div
                className={`${style.placeholder} ${placeholderType} ${placeholderClassName}`}
                ref={placeholderRef}>
                <div
                    className={`${style.placeholder__span} ${
                        focus ? style.placeholder__span_active : ''
                    }`}>
                    {type === 'text' ? placeholder : ''}
                </div>
            </div>
        </label>
    );
};

export default Input;
