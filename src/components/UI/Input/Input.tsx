import { DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import style from './Input.module.scss';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface ICustomInput
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    charHideBtn?: boolean;
}

const Input: FC<ICustomInput> = ({
    type = 'text',
    charHideBtn = false,
    placeholder,
    value,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [focus, setFocus] = useState(false);
    const [hideChars, setHideChars] = useState(true);

    const inputClassName = type === 'number' ? style.number : style.text;
    const placeholderFocused = focus ? style.placeholder_active : '';

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

    useEffect(() => {
        if (value) {
            setFocus(true);
        } else if (!value && inputRef.current !== document.activeElement) {
            setFocus(false);
        }
    }, [value]);

    return (
        <div className={style.wrapper}>
            <label className={style.label}>
                <input
                    ref={inputRef}
                    type={hideChars ? type : 'text'}
                    className={`${style.input} ${inputClassName}`}
                    placeholder={type === 'number' ? placeholder : ''}
                    value={value}
                    {...props}
                />
                {type !== 'number' && (
                    <div
                        className={`${style.placeholder} ${placeholderFocused}`}
                        ref={placeholderRef}>
                        <span
                            className={`${style.placeholder__text} ${
                                focus ? style.placeholder__text_active : ''
                            }`}>
                            {placeholder}
                        </span>
                    </div>
                )}
            </label>
            {charHideBtn && (
                <span
                    className={style.hideicon}
                    onClick={() => {
                        setHideChars((prev) => !prev);
                    }}
                    style={{ color: inputRef.current?.value === '' ? '#a5a1b2' : '#1f1b2e' }}>
                    {hideChars ? <FiEyeOff /> : <FiEye />}
                </span>
            )}
        </div>
    );
};

export default Input;
