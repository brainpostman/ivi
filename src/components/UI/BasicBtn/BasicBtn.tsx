import typeText from './TextBasicBtn.module.scss';
import typeIcon from './IconBasicBtn.module.scss';

export interface IBasicBtnProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    btnType: 'text' | 'icon';
    variant: 1 | 2;
}

const BasicBtn = ({
    className = '',
    btnType = 'text',
    variant = 1,
    children,
    ...props
}: IBasicBtnProps) => {
    let styles = btnType === 'text' ? typeText : typeIcon;
    return (
        <button
            className={`${styles.button} ${
                variant === 1 ? styles.variant1 : styles.variant2
            } ${className}`}
            {...props}>
            {children}
        </button>
    );
};

export default BasicBtn;
