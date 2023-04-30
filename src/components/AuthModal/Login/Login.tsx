import styles from './Login.module.scss';
import parentStyles from '../AuthModal.module.scss';
import { useTranslation } from 'next-i18next';
import Input from '@/components/UI/Input/Input';
import { Dispatch, SetStateAction, useState } from 'react';
import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { validatePassword } from '@/utils/auth.util';

interface ILoginProps {
    errorMessages: string[];
    setErrorMessages: Dispatch<SetStateAction<string[]>>;
    handleSignIn: (provider: string, email: string) => void;
}

const Login = ({ errorMessages, setErrorMessages, handleSignIn }: ILoginProps) => {
    const { t } = useTranslation();

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
                    setErrorMessages([]);
                    setPasswordInput(e.target.value);
                }}
                charHideBtn
                placeholder={t('login.enter-pass')}
                autoFocus
            />
            <HighlightButton
                disabled={passwordInput && errorMessages.length === 0 ? false : true}
                className={parentStyles.highlightbtn}
                onClick={() => {
                    let passwordError = validatePassword(passwordInput);
                    if (passwordError.length > 0) {
                        setErrorMessages([...passwordError]);
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
