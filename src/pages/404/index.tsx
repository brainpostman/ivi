import style from './index.module.scss'

export default function Error() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h1 className={style.title}>Ошибка</h1>
        <h2 className={style.subtitle}>Запрашиваемой страницы не существует</h2>
      </div>
    </div>
  )
}
