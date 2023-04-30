import Input from '@/components/UI/Input/Input';
import styles from './AuthOptions.module.scss';
import parentStyles from '../AuthModal.module.scss';
import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn';
import { validateEmail } from '@/utils/auth.util';
import { signIn } from 'next-auth/react';
import { FaGoogle, FaVk } from 'react-icons/fa';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface IEmailInputProps {
    emailInput: string;
    setEmailInput: Dispatch<SetStateAction<string>>;
    errorMessages: string[];
    setError: (error: string[]) => void;
    resetError: () => void;
    handleEmail: (email: string) => void;
    className?: string;
}

const EmailInput = ({
    emailInput,
    setEmailInput,
    errorMessages,
    setError,
    resetError,
    handleEmail,
    className = '',
}: IEmailInputProps) => {
    const { t } = useTranslation('auth_modal');

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.inputs}>
                <Input
                    type='email'
                    value={emailInput}
                    onChange={(e) => {
                        if (errorMessages.length > 0) resetError();
                        setEmailInput(e.target.value);
                    }}
                    placeholder={t('email-placeholder')}
                    autoFocus
                />
                <HighlightButton
                    className={parentStyles.highlightbtn}
                    disabled={emailInput ? false : true}
                    onClick={() => {
                        let emailError = validateEmail(emailInput);
                        if (emailError) {
                            setError([emailError]);
                            return;
                        }
                        handleEmail(emailInput);
                    }}>
                    {t('continue')}
                </HighlightButton>
                <BasicBtn
                    onClick={() => {
                        signIn('google');
                    }}
                    btnType='textPlusIcon'
                    title={t('login.signin-google')}
                    className={`${parentStyles.basicbtn} ${styles.basicbtn_google}`}>
                    <FaGoogle />
                </BasicBtn>
                <BasicBtn
                    onClick={() => signIn('vk')}
                    btnType='textPlusIcon'
                    title={t('login.signin-vk')}
                    className={`${parentStyles.basicbtn} ${styles.basicbtn_vk}`}>
                    <FaVk />
                </BasicBtn>
            </div>
        </div>
    );
};

export default EmailInput;
