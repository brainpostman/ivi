import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import style from './HighlightButton.module.scss';

const HighlightButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return (
    <button className={`${style.button} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default HighlightButton;
