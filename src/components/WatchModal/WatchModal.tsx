import React from 'react'
import style from './WatchModal.module.scss'

interface WatchProps {
  active: boolean
  children: React.ReactNode
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}
const WatchModal: React.FC<WatchProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={`${style.modal} ${active ? style.modal_active : ''}`}
      onClick={() => setActive(false)}
    >
      <div>{children}</div>
    </div>
  )
}
export default WatchModal
