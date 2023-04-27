import { FC } from 'react';
import { IBasicBtnProps } from './BasicBtn.interface';
import style from './BasicBtn.module.scss';
import { getClassNameBtnType } from './BasicBtn.util';
import BasicBtnWrapper from './BasicBtnWrapper/BasicBtnWrapper';

const BasicBtn: FC<IBasicBtnProps> = ({
    className = '',
    btnType = 'text',
    children,
    title,
    subtitle,
    ...props
}) => {
    const classNameBtnType = getClassNameBtnType(btnType);

    const currentClassName = `${style.button} ${classNameBtnType} ${className}`;

    return (
        <BasicBtnWrapper className={currentClassName} {...props}>
            {btnType === 'textPlusIcon' ? (
                <>
                    {children}
                    <div className={style.description}>
                        {subtitle && <p className={style.subtitle}>{subtitle}</p>}
                        <p className={style.title}>{title}</p>
                    </div>
                </>
            ) : (
                children
            )}
        </BasicBtnWrapper>
    );
};

export default BasicBtn;
