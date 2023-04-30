import Input from '@/components/UI/Input/Input';
import styles from './EmailInput.module.scss';
import parentStyles from '../AuthModal.module.scss';
import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn';
import { validateEmail } from '@/utils/auth.util';
import { signIn } from 'next-auth/react';
import { FaGoogle, FaVk } from 'react-icons/fa';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface IEmailInputProps {
    errorMessages: string[];
    setErrorMessages: Dispatch<SetStateAction<string[]>>;
    handleEmail: (email: string) => void;
}

const EmailInput = ({ errorMessages, setErrorMessages, handleEmail }: IEmailInputProps) => {
    const [emailInput, setEmailInput] = useState('');
    const { t } = useTranslation('auth_modal');

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <Input
                    type='email'
                    value={emailInput}
                    onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (errorMessages.length > 0) setErrorMessages([]);
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
                            setErrorMessages([emailError]);
                            return;
                        }
                        console.log(emailError);
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
