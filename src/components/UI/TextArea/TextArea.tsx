import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  MutableRefObject,
  Ref,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './TextArea.module.scss'

interface ICustomTextArea
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  charHideBtn?: boolean
  ref?: Ref<HTMLTextAreaElement>
}

const TextArea: FC<ICustomTextArea> = ({
  placeholder,
  value,
  ref,
  className: propsClassName,
  autoFocus,
  style: propsStyle,
  onChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [focus, setFocus] = useState(false)
  const placeholderActive = active ? styles.placeholder_active : ''

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value === '') {
      textareaRef.current.style.height = '35px'
      textareaRef.current.style.overflow = 'hidden'
    } else if (textareaRef.current && textareaRef.current.value !== '') {
      textareaRef.current.style.height = '300px'
      textareaRef.current.style.overflow = 'initial'
    }
  }, [])

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value === '') {
      textareaRef.current.style.height = '35px'
      textareaRef.current.style.overflow = 'hidden'
    }
  }, [value])

  useEffect(() => {
    if (textareaRef.current?.value) {
      setActive(true)
    } else if (!textareaRef.current?.value && !focus) {
      setActive(false)
    }
  }, [value])

  const onChangeHandler = function (e: ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement
    if (textareaRef.current) {
      if (target.scrollHeight < 300) {
        textareaRef.current.style.overflow = 'hidden'
        textareaRef.current.style.height = '35px'
        textareaRef.current.style.height = `${target.scrollHeight - 1}px`
      } else {
        textareaRef.current.style.overflow = 'initial'
      }
    }
  }

  useEffect(() => {
    if (autoFocus) {
      setActive(true)
    }
  }, [autoFocus])

  return (
    <div className={`${styles.wrapper}`} style={propsStyle}>
      <label className={styles.label}>
        <textarea
          className={`${styles.textarea}  ${propsClassName}`}
          value={value}
          {...props}
          onFocus={() => {
            setActive(true)
            setFocus(true)
          }}
          onBlur={() => {
            if (!textareaRef.current?.value) {
              setActive(false)
              setFocus(false)
            }
          }}
          ref={element => {
            ;(
              textareaRef as MutableRefObject<HTMLTextAreaElement | null>
            ).current = element
            if (ref) {
              if (typeof ref === 'function') {
                ref(element)
              } else {
                ;(ref as MutableRefObject<HTMLTextAreaElement | null>).current =
                  element
              }
            }
          }}
          onChange={e => {
            if (onChange) onChange(e)
            onChangeHandler(e)
          }}
          autoFocus={autoFocus}
        />
        <div
          className={`${styles.placeholder} ${placeholderActive}`}
          ref={placeholderRef}
        >
          <span
            className={`${styles.placeholder__text} ${
              active ? styles.placeholder__text_active : ''
            }`}
          >
            {placeholder}
          </span>
        </div>
      </label>
    </div>
  )
}

export default TextArea
