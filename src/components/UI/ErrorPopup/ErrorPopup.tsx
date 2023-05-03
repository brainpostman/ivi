import { AiOutlineExclamationCircle } from 'react-icons/ai';
import styles from './ErrorPopup.module.scss';
import { useTranslation } from 'next-i18next';
import { Ref, forwardRef } from 'react';

interface IErrorPopupProps {
    className?: string;
    messages: string | string[];
}

const ErrorPopup = forwardRef(
    ({ className, messages }: IErrorPopupProps, ref: Ref<HTMLDivElement>) => {
        const { t } = useTranslation('error');
        return (
            <div ref={ref} className={`${styles.error} ${className}`}>
                <AiOutlineExclamationCircle />
                <div className={styles.error__content}>
                    <p className={styles.error__title}>{t('error')}</p>
                    <ul className={styles.error__messages}>
                        {Array.isArray(messages) ? (
                            messages.map((item) => {
                                return (
                                    <li key={item} className={styles.error__message}>
                                        {item}
                                    </li>
                                );
                            })
                        ) : (
                            <li className={styles.error__message}>{messages}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
);

ErrorPopup.displayName = 'ErrorPopup';

export default ErrorPopup;
