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
    className: propsClassName,
    ...props
}) => {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const [focus, setFocus] = useState(false);
    const [hideChars, setHideChars] = useState(true);

    const inputClassName = type === 'number' ? style.number : style.text;
    const placeholderActive = active ? style.placeholder_active : '';

    useEffect(() => {
        if (value) {
            setActive(true);
        } else if (!value && !focus) {
            setActive(false);
        }
    }, [value]);

    return (
        <div className={style.wrapper}>
            <label className={style.label}>
                <input
                    type={hideChars ? type : 'text'}
                    className={`${propsClassName} ${style.input} ${inputClassName}`}
                    placeholder={type === 'number' ? placeholder : ''}
                    value={value}
                    {...props}
                    onFocus={() => {
                        setActive(true);
                        setFocus(true);
                    }}
                    onBlur={() => {
                        if (value === '') {
                            setActive(false);
                            setFocus(false);
                        }
                    }}
                />
                {type !== 'number' && (
                    <div
                        className={`${style.placeholder} ${placeholderActive}`}
                        ref={placeholderRef}>
                        <span
                            className={`${style.placeholder__text} ${
                                active ? style.placeholder__text_active : ''
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
                    style={{ color: value === '' ? '#a5a1b2' : '#1f1b2e' }}>
                    {hideChars ? <FiEyeOff /> : <FiEye />}
                </span>
            )}
        </div>
    );
};

export default Input;
