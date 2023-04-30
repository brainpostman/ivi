import { useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useActions } from '@/hooks/ReduxHooks';
import { signIn } from 'next-auth/react';
import { TbPencil } from 'react-icons/tb';
import { checkEmailVacancy } from '@/utils/auth.util';
import { CSSTransition } from 'react-transition-group-react-18';
import { delay } from '@/utils/delay';
import { useTranslation } from 'next-i18next';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import AuthOptions from './AuthOptions/AuthOptions';
import Registration from './Registration/Registration';
import Login from './Login/Login';

interface IAuthModalProps {
    modalShown: boolean;
}

interface IEditEmailProps {
    editEmail: () => void;
    validatedEmail: string;
}

const EditEmail = ({ editEmail, validatedEmail }: IEditEmailProps) => {
    return (
        <div className={styles.useremail} onClick={editEmail}>
            <div className={styles.useremail_edit}>
                <TbPencil />
            </div>
            <div className={`${styles.useremail_mail} ${styles.message}`}>{validatedEmail}</div>
        </div>
    );
};

const AuthModal = ({ modalShown }: IAuthModalProps) => {
    const { t } = useTranslation('auth_modal');

    //булевый флаг отрисовки окна
    const { setAuthModal } = useActions();
    //состояния переходов
    const [authIn, setAuthIn] = useState(false);
    const [passIn, setPassIn] = useState(false);
    const transitionDelay = 2000;
    //состояния
    const [emailInput, setEmailInput] = useState('');
    const [validatedEmail, setValidatedEmail] = useState('');
    const [authFlow, setAuthFlow] = useState('');
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [progressBar, setProgressBar] = useState(0);
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

    useEffect(() => {
        setAuthIn(true);
        setProgressBar(5);
    }, []);

    //алгоритм авторизации/регистрации
    const handleEmail = async (email: string) => {
        let response = await checkEmailVacancy(email);
        if (response === 'login' || response === 'register') {
            setErrorMessages([]);
            setProgressBar(50);
            setValidatedEmail(email);
            setAuthIn(false);
            setAuthFlow(response);
            await delay(transitionDelay);
            setPassIn(true);
        } else {
            setErrorMessages([response]);
        }
    };

    const editEmail = async () => {
        setErrorMessages([]);
        setEmailInput(validatedEmail);
        setValidatedEmail('');
        setProgressBar(5);
        setAuthFlow('');
        setPassIn(false);
        await delay(transitionDelay);
        setAuthIn(true);
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
                <CSSTransition
                    in={authIn}
                    timeout={transitionDelay}
                    classNames={{
                        enter: styles.emailOauth_enter,
                        enterActive: styles.emailOauth_enterActive,
                        enterDone: styles.emailOauth_enterDone,
                        exit: styles.emailOauth_exit,
                        exitActive: styles.emailOauth_exitActive,
                        exitDone: styles.emailOauth_exitDone,
                    }}
                    mountOnEnter
                    unmountOnExit>
                    <div className={styles.chat__container}>
                        <div className={`${styles.message} ${styles.message__prompt}`}>
                            {t('login-or-register')}
                        </div>
                        <AuthOptions
                            emailInput={emailInput}
                            setEmailInput={setEmailInput}
                            errorMessages={errorMessages}
                            setErrorMessages={setErrorMessages}
                            handleEmail={handleEmail}
                        />
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={passIn}
                    timeout={transitionDelay}
                    classNames={{
                        enter: styles.passInput_enter,
                        enterActive: styles.passInput_enterActive,
                        enterDone: styles.passInput_enterDone,
                        exit: styles.passInput_exit,
                        exitActive: styles.passInput_exitActive,
                        exitDone: styles.passInput_exitDone,
                    }}
                    mountOnEnter
                    unmountOnExit>
                    <div>
                        {authFlow === 'login' ? (
                            <div className={styles.chat__container}>
                                <EditEmail editEmail={editEmail} validatedEmail={validatedEmail} />
                                <Login
                                    errorMessages={errorMessages}
                                    setErrorMessages={setErrorMessages}
                                    handleSignIn={handleSignIn}
                                />
                            </div>
                        ) : authFlow === 'register' ? (
                            <div className={styles.chat__container}>
                                <EditEmail editEmail={editEmail} validatedEmail={validatedEmail} />
                                <Registration
                                    errorMessages={errorMessages}
                                    setErrorMessages={setErrorMessages}
                                    handleSignIn={handleSignIn}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </CSSTransition>
                {errorMessages.length > 0 && (
                    <div className={`${styles.chat__container}`}>
                        <ErrorPopup messages={errorMessages} className={styles.error} />
                    </div>
                )}
            </section>
        </div>
    );
};

export default AuthModal;
