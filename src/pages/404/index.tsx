import style from './index.module.scss'

export default function Error() {
  return (
    <div className={style.wrapper}>
        <div className={style.content}>
        <h1>Ошибка</h1>
        <h2>Запрашиваемой страницы не существует</h2>
        </div>
    </div>
  )
}
