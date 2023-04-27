import { useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useActions } from '@/hooks/ReduxHooks';
import { signIn } from 'next-auth/react';
import Input from '../UI/Input/Input';
import HighlightButton from '../UI/HighlightButton/HighlightButton';
import BasicBtn from '../UI/BasicBtn/BasicBtn';
import { FaGoogle, FaVk } from 'react-icons/fa';
import { TbPencil } from 'react-icons/tb';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import {
    checkEmailVacancy,
    validateConfirmedPassword,
    validateEmail,
    validatePassword,
} from '@/utils/auth.util';
import { CSSTransition } from 'react-transition-group-react-18';
import List from '../UI/List/List';
import { delay } from '@/utils/delay';

interface IAuthModalProps {
    modalShown: boolean;
}
//TODO: деструктуризация, деструктуризация, деструктуризация... 
//TODO: доделать транзишны
const AuthModal = ({ modalShown }: IAuthModalProps) => {
    //булевый флаг отрисовки окна
    const { setAuthModal } = useActions();
    const [showAuthInputs, setShowAuthInputs] = useState(true);
    const [showPassInputs, setShowPassInputs] = useState(false);
    const transitionDelay = 1000;
    //состояния
    const [emailInput, setEmailInput] = useState('');
    const [validatedEmail, setValidatedEmail] = useState('');

    const [passwordInput, setPasswordInput] = useState('');
    const [confirmedPasswordInput, setConfirmedPasswordInput] = useState('');

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
    useEffect(() => {}, []);
    //алгоритм авторизации/регистрации
    const handleEmail = async (email: string) => {
        let response = await checkEmailVacancy(email);
        if (response === 'login' || response === 'register') {
            setProgressBar(50);
            setValidatedEmail(email);
            setErrorMessages([]);
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
            setErrorMessages([err.message ?? 'Произошла непредвиденная ошибка']);
        }
    };

    return (
        <div className={styles.modal} ref={modalRef}>
            <section className={styles.header}>
                <div className={styles.header__container}>
                    <div></div>
                    <h2 className={styles.header__title}>Вход или регистрация</h2>
                </div>
                <div
                    className={styles.header__progressBar}
                    style={{
                        width: `${progressBar}%`,
                    }}></div>
                <div className={styles.close} onClick={() => setAuthModal(false)}></div>
            </section>
            <section className={styles.chat}>
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
                            <div className={`${styles.message} ${styles.message__prompt}`}>
                                Войдите или зарегистрируйтесь
                            </div>
                            <div className={styles.inputs}>
                                <Input
                                    type='email'
                                    value={emailInput}
                                    onChange={(e) => {
                                        setEmailInput(e.target.value);
                                        if (errorMessages.length > 0) setErrorMessages([]);
                                    }}
                                    placeholder='Введите ваш email'
                                    autoFocus
                                />
                                <HighlightButton
                                    className={styles.highlightbtn}
                                    disabled={emailInput ? false : true}
                                    onClick={() => {
                                        let emailError = validateEmail(emailInput);
                                        if (emailError) {
                                            setErrorMessages([emailError]);
                                            return;
                                        }
                                        handleEmail(emailInput);
                                    }}>
                                    Продолжить
                                </HighlightButton>
                                <BasicBtn
                                    onClick={() => {
                                        signIn('google');
                                    }}
                                    btnType='textPlusIcon'
                                    title='Войти с помощью Google'
                                    className={`${styles.basicbtn} ${styles.basicbtn_google}`}>
                                    <FaGoogle />
                                </BasicBtn>
                                <BasicBtn
                                    onClick={() => signIn('vk')}
                                    btnType='textPlusIcon'
                                    title='Войти с помощью ВКонтакте'
                                    className={`${styles.basicbtn} ${styles.basicbtn_vk}`}>
                                    <FaVk />
                                </BasicBtn>
                            </div>
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
                            <div className={`${styles.message} ${styles.message__prompt}`}>
                                Войдите или зарегистрируйтесь
                            </div>
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
                                <div className={`${styles.message} ${styles.message__prompt}`}>
                                    Введите пароль, чтобы войти
                                </div>
                                <Input
                                    type='password'
                                    value={passwordInput}
                                    onChange={(e) => {
                                        setErrorMessages([]);
                                        setPasswordInput(e.target.value);
                                    }}
                                    charHideBtn
                                    placeholder='Введите пароль'
                                    autoFocus
                                />
                                <HighlightButton
                                    disabled={
                                        passwordInput && errorMessages.length === 0 ? false : true
                                    }
                                    className={styles.highlightbtn}
                                    onClick={() => {
                                        let passwordError = validatePassword(passwordInput);
                                        if (passwordError.length > 0) {
                                            setErrorMessages([...passwordError]);
                                            return;
                                        }
                                        handleSignIn(authFlow, passwordInput);
                                    }}>
                                    Войти
                                </HighlightButton>
                            </div>
                        ) : (
                            <div className={styles.chat__container}>
                                <div className={`${styles.message} ${styles.message__prompt}`}>
                                    <p>Придумайте пароль для входа</p>
                                    <p className={styles.submessage}>
                                        минимум 6 символов, допускаются латинские буквы, цифры и
                                        спецсимволы
                                    </p>
                                </div>
                                <Input
                                    type='password'
                                    value={passwordInput}
                                    onChange={(e) => {
                                        setErrorMessages([]);
                                        setPasswordInput(e.target.value);
                                    }}
                                    charHideBtn
                                    placeholder='Введите пароль'
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
                                    placeholder='Подтвердите пароль'
                                />
                                <HighlightButton
                                    disabled={
                                        passwordInput &&
                                        passwordInput.length === confirmedPasswordInput.length &&
                                        errorMessages.length === 0
                                            ? false
                                            : true
                                    }
                                    className={styles.highlightbtn}
                                    onClick={() => {
                                        let passwordErrors: string[] =
                                            validatePassword(passwordInput);
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
                                        handleSignIn(authFlow, confirmedPasswordInput);
                                    }}>
                                    Зарегистрироваться
                                </HighlightButton>
                            </div>
                        )}
                    </CSSTransition>
                )}
                {errorMessages.length > 0 && (
                    <div className={styles.chat__container}>
                        <div className={styles.error}>
                            <AiOutlineExclamationCircle />
                            <div className={styles.error__content}>
                                <p className={styles.error__title}>Ошибка</p>
                                <List
                                    items={errorMessages}
                                    className={styles.error__messages}
                                    renderItem={(item) => {
                                        return (
                                            <li className={styles.error__message} key={item}>
                                                {item}
                                            </li>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AuthModal;
