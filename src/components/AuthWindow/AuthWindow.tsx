import { useEffect, useRef, useState } from 'react'
import styles from './AuthWindow.module.scss'
import { useActions } from '@/hooks/ReduxHooks'
import { signIn } from 'next-auth/react'
import { TbPencil } from 'react-icons/tb'
import { checkEmailVacancy } from '@/utils/auth.util'
import { CSSTransition } from 'react-transition-group-react-18'
import { delay } from '@/utils/delay'
import { useTranslation } from 'next-i18next'
import ErrorPopup from '../UI/ErrorPopup/ErrorPopup'
import AuthOptions from './AuthOptions/AuthOptions'
import Registration from './Registration/Registration'
import Login from './Login/Login'
import { useRouter } from 'next/router'

interface IAuthWindowProps {
  modalShown?: boolean
  isModal?: boolean
}

interface IEditEmailProps {
  editEmail: () => void
  validatedEmail: string
}

const EditEmail = ({ editEmail, validatedEmail }: IEditEmailProps) => {
  return (
    <div className={styles.useremail} onClick={editEmail}>
      <div className={styles.useremail_edit}>
        <TbPencil />
      </div>
      <div className={`${styles.useremail_mail} ${styles.message}`}>
        {validatedEmail}
      </div>
    </div>
  )
}

const transitionStyles = {
  enter: styles.transition_enter,
  enterActive: styles.transition_enterActive,
  enterDone: styles.transition_enterDone,
  exit: styles.transition_exit,
  exitActive: styles.transition_exitActive,
  exitDone: styles.transition_exitDone,
}

const AuthWindow = ({
  modalShown = true,
  isModal = false,
}: IAuthWindowProps) => {
  const { t } = useTranslation('auth_modal')
  const router = useRouter()

  //булевый флаг отрисовки окна
  const { setAuthModal } = useActions()
  const [progressBar, setProgressBar] = useState(0)

  //состояния переходов
  const [authIn, setAuthIn] = useState(false)
  const [errorIn, setErrorIn] = useState(false)
  const transitionDelay = 400
  //состояния
  const [emailInput, setEmailInput] = useState('')
  const [validatedEmail, setValidatedEmail] = useState('')
  const [authFlow, setAuthFlow] = useState('')

  const [errorMessages, setErrorMessages] = useState<string[]>([])
  //рефы
  const modalRef = useRef<HTMLDivElement>(null)
  const authRef = useRef<HTMLDivElement>(null)
  const loginRef = useRef<HTMLDivElement>(null)
  const registerRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  //фиксирование модалки в окне браузера
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.top = window.scrollY + 'px'
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modalShown])

  useEffect(() => {
    setAuthIn(true)
    setProgressBar(5)
  }, [])

  //алгоритм авторизации/регистрации
  const handleEmail = async (email: string) => {
    let response = await checkEmailVacancy(email)
    if (response === 'login' || response === 'register') {
      resetError()
      setProgressBar(50)
      setValidatedEmail(email)
      setAuthIn(false)
      await delay(transitionDelay)
      setAuthFlow(response)
    } else {
      setError([response])
    }
  }

  const editEmail = async () => {
    resetError()
    setEmailInput(validatedEmail)
    setValidatedEmail('')
    setProgressBar(5)
    setAuthFlow('')
    await delay(transitionDelay)
    setAuthIn(true)
  }

  const handleSignIn = (provider: string, password: string) => {
    try {
      signIn(provider, {
        redirect: false,
        email: validatedEmail,
        password: password,
      }).then(async signInResponse => {
        if (signInResponse?.ok) {
          setProgressBar(100)
          await delay(transitionDelay)
          router.reload()
        } else {
          if (signInResponse?.status == 401) {
            setError([t('error-messages.incorrect-pass')])
          } else {
            throw new Error(t('error-messages.unforeseen-error'))
          }
        }
      })
    } catch (err: any) {
      setError([err.message])
    }
  }

  const setError = (errors: string[]) => {
    setErrorMessages(errors)
    setErrorIn(true)
  }

  const resetError = () => {
    setErrorIn(false)
    setErrorMessages([''])
  }

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
          }}
        ></div>
        {isModal && (
          <div
            className={styles.close}
            onClick={() => setAuthModal(false)}
          ></div>
        )}
      </section>
      <section className={styles.chat}>
        <CSSTransition
          in={authIn}
          timeout={transitionDelay}
          classNames={transitionStyles}
          mountOnEnter
          unmountOnExit
          nodeRef={authRef}
        >
          <div ref={authRef} className={styles.chat__container}>
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
          unmountOnExit
          nodeRef={loginRef}
        >
          <div ref={loginRef} className={styles.chat__container}>
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
          unmountOnExit
          nodeRef={registerRef}
        >
          <div ref={registerRef} className={styles.chat__container}>
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
          unmountOnExit
          nodeRef={successRef}
        >
          <div ref={successRef} className={styles.chat__container}>
            <div className={`${styles.message} ${styles.message__success}`}>
              {t('success')}
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={errorIn}
          timeout={transitionDelay}
          classNames={transitionStyles}
          mountOnEnter
          unmountOnExit
          nodeRef={errorRef}
        >
          <ErrorPopup
            ref={errorRef}
            messages={errorMessages}
            className={styles.error}
          />
        </CSSTransition>
      </section>
    </div>
  )
}

export default AuthWindow
