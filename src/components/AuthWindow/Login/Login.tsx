import styles from './Login.module.scss';
import parentStyles from '../AuthWindow.module.scss';
import { useTranslation } from 'next-i18next';
import Input from '@/components/UI/Input/Input';
import { useState } from 'react';
import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { validatePassword } from '@/utils/auth.util';

interface ILoginProps {
    errorMessages: string[];
    setError: (error: string[]) => void;
    handleSignIn: (provider: string, email: string) => void;
    resetError: () => void;
}

const Login = ({ errorMessages, setError, resetError, handleSignIn }: ILoginProps) => {
    const { t } = useTranslation('auth_modal');

    const [passwordInput, setPasswordInput] = useState('');

    return (
        <div className={styles.container}>
            <div className={`${parentStyles.message} ${parentStyles.message__prompt}`}>
                {t('login.enter-pass-to-login')}
            </div>
            <Input
                type='password'
                value={passwordInput}
                onChange={(e) => {
                    if (errorMessages.length > 0) resetError();
                    setPasswordInput(e.target.value);
                }}
                charHideBtn
                placeholder={t('login.enter-pass')}
                autoFocus
            />
            <HighlightButton
                disabled={passwordInput ? false : true}
                className={parentStyles.highlightbtn}
                onClick={() => {
                    let passwordError = validatePassword(passwordInput);
                    if (passwordError.length > 0) {
                        setError([...passwordError]);
                        return;
                    }
                    handleSignIn('login', passwordInput);
                }}>
                {t('login.login')}
            </HighlightButton>
        </div>
    );
};

export default Login;
