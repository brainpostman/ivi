import { useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useActions } from '@/hooks/ReduxHooks';
import { signIn, useSession } from 'next-auth/react';
import { TbPencil } from 'react-icons/tb';
import { checkEmailVacancy } from '@/utils/auth.util';
import { CSSTransition } from 'react-transition-group-react-18';
import { delay } from '@/utils/delay';
import { useTranslation } from 'next-i18next';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import AuthOptions from './AuthOptions/AuthOptions';
import Registration from './Registration/Registration';
import Login from './Login/Login';
import { useRouter } from 'next/router';

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

const transitionStyles = {
    enter: styles.transition_enter,
    enterActive: styles.transition_enterActive,
    enterDone: styles.transition_enterDone,
    exit: styles.transition_exit,
    exitActive: styles.transition_exitActive,
    exitDone: styles.transition_exitDone,
};

//TODO: login fail flow
const AuthModal = ({ modalShown }: IAuthModalProps) => {
    const { t } = useTranslation('auth_modal');
    const router = useRouter();

    //булевый флаг отрисовки окна
    const { setAuthModal } = useActions();
    const [progressBar, setProgressBar] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    //состояния переходов
    const [authIn, setAuthIn] = useState(false);
    const [errorIn, setErrorIn] = useState(false);
    const errorTimeout = useRef<number>(0);
    const transitionDelay = 400;
    //состояния
    const [emailInput, setEmailInput] = useState('');
    const [validatedEmail, setValidatedEmail] = useState('');
    const [authFlow, setAuthFlow] = useState('');

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

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
            await delay(transitionDelay);
            setAuthFlow(response);
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
        await delay(transitionDelay);
        setAuthIn(true);
    };

    const handleSignIn = (provider: string, password: string) => {
        try {
            signIn(provider, {
                redirect: false,
                email: validatedEmail,
                password: password,
            });
            setProgressBar(100);
            router.reload();
        } catch (err: any) {
            setErrorMessages([err.message ?? t('error-messages.unforeseen-error')]);
        }
    };

    const setError = (errors: string[]) => {
        window.clearTimeout(errorTimeout.current);
        setErrorMessages(errors);
        setErrorIn(true);
    };

    const resetError = () => {
        setErrorIn(false);
        setErrorMessages(['']);
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
                    classNames={transitionStyles}
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
                            setError={setError}
                            resetError={resetError}
                            handleEmail={handleEmail}
                        />
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={authFlow === 'login'}
                    timeout={transitionDelay}
                    classNames={transitionStyles}
                    mountOnEnter
                    unmountOnExit>
                    <div className={styles.chat__container}>
                        <EditEmail editEmail={editEmail} validatedEmail={validatedEmail} />
                        <Login
                            errorMessages={errorMessages}
                            setError={setError}
                            resetError={resetError}
                            handleSignIn={handleSignIn}
                        />
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={authFlow === 'register'}
                    timeout={transitionDelay}
                    classNames={transitionStyles}
                    mountOnEnter
                    unmountOnExit>
                    <div className={styles.chat__container}>
                        <EditEmail editEmail={editEmail} validatedEmail={validatedEmail} />
                        <Registration
                            errorMessages={errorMessages}
                            setError={setError}
                            resetError={resetError}
                            handleSignIn={handleSignIn}
                            validatedEmail={validatedEmail}
                        />
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={progressBar === 100}
                    timeout={transitionDelay}
                    classNames={transitionStyles}
                    mountOnEnter
                    unmountOnExit>
                    <div className={styles.chat__container}>
                        <div className={`${styles.message} ${styles.message__prompt}`}>
                            {t('success')}
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={errorIn}
                    timeout={transitionDelay}
                    classNames={transitionStyles}
                    mountOnEnter
                    unmountOnExit>
                    <ErrorPopup messages={errorMessages} className={styles.error} />
                </CSSTransition>
            </section>
        </div>
    );
};

export default AuthModal;
