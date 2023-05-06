import style from './WatchBlock.module.scss'

export default function watchBlock() {
  return (
    <div className={style.wrapper}>
        <hr/>
        <div className={style.wrapper_content}>
            <div className={style.content_tongth}>
                <h3>Языки</h3>
                <h4>Русский, Английский</h4>
            </div>

            <div className={style.content_sub}>
                <h3>Субтитры</h3>
                <h4>Русский</h4>
            </div>

            <div className={style.content_remark}>
                Изображение и звук.
                <span>Фактическое качество зависит от устройства и ограничений правообладателя</span>
            </div>

            <div className={style.content_icons}>

                <div className={style.icon_4k}><div className={style.icon_text}> 4K </div></div>
                <div className={style.icon_fullhd}><div className={style.icon_text}> FullHD </div></div>
                <div className={style.icon_hd}><div className={style.icon_text}> HD </div></div>
                <div className={style.icon_1080}><div className={style.icon_text}> 1080 </div></div>
                <div className={style.icon_720}><div className={style.icon_text}> 720 </div></div>
                <div className={style.icon_51}><div className={style.icon_text}> 5.1 </div></div>
                
            </div>
        </div>
        <hr/>
    </div>
  )
}
