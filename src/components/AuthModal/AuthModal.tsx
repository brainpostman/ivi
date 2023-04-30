import { SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useActions } from '@/hooks/ReduxHooks';
import { signIn } from 'next-auth/react';
import Input from '../UI/Input/Input';
import HighlightButton from '../UI/HighlightButton/HighlightButton';
import BasicBtn from '../UI/BasicBtn/BasicBtn';
import { FaGoogle, FaVk } from 'react-icons/fa';
import { TbPencil } from 'react-icons/tb';
import {
    checkEmailVacancy,
    validateConfirmedPassword,
    validateEmail,
    validatePassword,
} from '@/utils/auth.util';
import { CSSTransition } from 'react-transition-group-react-18';
import { delay } from '@/utils/delay';
import { useTranslation } from 'next-i18next';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import EmailInput from './EmailInput/EmailInput';
import Registration from './Registration/Registration';
import Login from './Login/Login';

interface IAuthModalProps {
    modalShown: boolean;
}
//TODO: деструктуризация, деструктуризация, деструктуризация...
//TODO: доделать транзишны
const AuthModal = ({ modalShown }: IAuthModalProps) => {
    const { t } = useTranslation('auth_modal');

    //булевый флаг отрисовки окна
    const { setAuthModal } = useActions();
    //состояния переходов
    const [showAuthInputs, setShowAuthInputs] = useState(true);
    const [showPassInputs, setShowPassInputs] = useState(false);
    const transitionDelay = 1000;
    //состояния
    const [emailInput, setEmailInput] = useState('');
    const [validatedEmail, setValidatedEmail] = useState('');
    const [authFlow, setAuthFlow] = useState('');
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [progressBar, setProgressBar] = useState(5);
    const modalRef = useRef<HTMLDivElement>(null);
    //фиксирование модалки в окне браузера
    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.style.top = window.scrollY + 'px';
        }
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalShown]);

    //алгоритм авторизации/регистрации
    const handleEmail = async (email: string) => {
        let response = await checkEmailVacancy(email);
        if (response === 'login' || response === 'register') {
            setErrorMessages([]);
            setProgressBar(50);
            setValidatedEmail(email);
            setShowAuthInputs(false);
            setAuthFlow(response);
            await delay(transitionDelay);
            setShowPassInputs(true);
        } else {
            setErrorMessages([response]);
        }
    };

    const editEmail = async () => {
        setErrorMessages([]);
        setEmailInput(validatedEmail);
        setValidatedEmail('');
        setProgressBar(5);
        setShowPassInputs(false);
        setAuthFlow('');
        await delay(transitionDelay);
        setShowAuthInputs(true);
    };

    const handleSignIn = (provider: string, password: string) => {
        try {
            signIn(provider, {
                email: validatedEmail,
                password: password,
            });
            setProgressBar(100);
        } catch (err: any) {
            setErrorMessages([err.message ?? t('error-messages.unforeseen-error')]);
        }
    };

    return (
        <div className={styles.modal} ref={modalRef}>
            <section className={styles.header}>
                <div className={styles.header__container}>
                    <div></div>
                    <h2 className={styles.header__title}>{t('authorization')}</h2>
                </div>
                <div
                    className={styles.header__progressBar}
                    style={{
                        width: `${progressBar}%`,
                    }}></div>
                <div className={styles.close} onClick={() => setAuthModal(false)}></div>
            </section>
            <section className={styles.chat}>
                <div className={styles.chat__container}>
                    <div className={`${styles.message} ${styles.message__prompt}`}>
                        {t('login-or-register')}
                    </div>
                </div>
                {showAuthInputs ? (
                    <CSSTransition
                        in={showAuthInputs}
                        timeout={transitionDelay}
                        classNames={{
                            enter: styles.emailOauth_enter,
                            enterActive: styles.emailOauth_enterActive,
                            enterDone: styles.emailOauth_enterDone,
                            exit: styles.emailOauth_exit,
                            exitActive: styles.emailOauth_exitActive,
                            exitDone: styles.emailOauth_exitDone,
                        }}>
                        <div className={styles.chat__container}>
                            <EmailInput
                                errorMessages={errorMessages}
                                setErrorMessages={setErrorMessages}
                                handleEmail={handleEmail}
                            />
                        </div>
                    </CSSTransition>
                ) : (
                    <CSSTransition
                        in={showPassInputs}
                        timeout={transitionDelay}
                        classNames={{
                            enter: styles.editMail_enter,
                            enterActive: styles.editMail_enterActive,
                            enterDone: styles.editMail_enterDone,
                            exit: styles.editMail_exit,
                            exitActive: styles.editMail_exitActive,
                            exitDone: styles.editMail_exitDone,
                        }}>
                        <div className={styles.chat__container}>
                            <div className={styles.useremail} onClick={editEmail}>
                                <div className={styles.useremail_edit}>
                                    <TbPencil />
                                </div>
                                <div className={`${styles.useremail_mail} ${styles.message}`}>
                                    {validatedEmail}
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                )}
                {showPassInputs && (
                    <CSSTransition
                        in={showPassInputs}
                        timeout={transitionDelay}
                        classNames={{
                            enter: styles.passInput_enter,
                            enterActive: styles.passInput_enterActive,
                            enterDone: styles.passInput_enterDone,
                            exit: styles.passInput_exit,
                            exitActive: styles.passInput_exitActive,
                            exitDone: styles.passInput_exitDone,
                        }}>
                        {authFlow === 'login' ? (
                            <div className={styles.chat__container}>
                                <Login
                                    errorMessages={errorMessages}
                                    setErrorMessages={setErrorMessages}
                                    handleSignIn={handleSignIn}
                                />
                            </div>
                        ) : (
                            <div className={styles.chat__container}>
                                <Registration
                                    errorMessages={errorMessages}
                                    setErrorMessages={setErrorMessages}
                                    handleSignIn={handleSignIn}
                                />
                            </div>
                        )}
                    </CSSTransition>
                )}
                {errorMessages.length > 0 && (
                    <div className={`${styles.chat__container}`}>
                        <ErrorPopup messages={errorMessages} className={styles.error} />{' '}
                    </div>
                )}
            </section>
        </div>
    );
};

export default AuthModal;
