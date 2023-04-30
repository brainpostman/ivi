import Input from '@/components/UI/Input/Input';
import parentStyles from '../AuthModal.module.scss';
import styles from './Registration.module.scss';
import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { validateConfirmedPassword, validatePassword } from '@/utils/auth.util';

interface IRegistrationProps {
    errorMessages: string[];
    setErrorMessages: Dispatch<SetStateAction<string[]>>;
    handleSignIn: (provider: string, email: string) => void;
}

const Registration = ({ errorMessages, setErrorMessages, handleSignIn }: IRegistrationProps) => {
    const { t } = useTranslation('auth_modal');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmedPasswordInput, setConfirmedPasswordInput] = useState('');

    return (
        <div className={styles.container}>
            <div className={`${parentStyles.message} ${parentStyles.message__prompt}`}>
                <p>{t('register.invent-pass')}</p>
                <p className={styles.submessage}>{t('register.pass-requirements')}</p>
            </div>
            <Input
                type='password'
                value={passwordInput}
                onChange={(e) => {
                    setErrorMessages([]);
                    setPasswordInput(e.target.value);
                }}
                charHideBtn
                placeholder={t('register.pass-placeholder')}
                autoFocus
            />
            <Input
                type='password'
                value={confirmedPasswordInput}
                onChange={(e) => {
                    setErrorMessages([]);
                    setConfirmedPasswordInput(e.target.value);
                }}
                charHideBtn
                placeholder={t('register.confirm-placeholder')}
            />
            <HighlightButton
                disabled={
                    passwordInput &&
                    passwordInput.length === confirmedPasswordInput.length &&
                    errorMessages.length === 0
                        ? false
                        : true
                }
                className={parentStyles.highlightbtn}
                onClick={() => {
                    let passwordErrors: string[] = validatePassword(passwordInput);
                    if (passwordErrors.length > 0) {
                        setErrorMessages([...passwordErrors]);
                        return;
                    }
                    let passwordError = validateConfirmedPassword(
                        passwordInput,
                        confirmedPasswordInput
                    );
                    if (passwordError.length > 0) {
                        setErrorMessages([passwordError]);
                        return;
                    }
                    handleSignIn('register', confirmedPasswordInput);
                }}>
                {t('register.register')}
            </HighlightButton>
        </div>
    );
};

export default Registration;
