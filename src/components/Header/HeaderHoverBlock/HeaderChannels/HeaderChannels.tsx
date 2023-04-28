import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import { headerTvBlockData } from '@/data/headerTVBlock.data'
import Image from 'next/image'
import styleParent from '../HeaderHoverBlock.module.scss'
import style from './HeaderChannels.module.scss'

const HeaderChannels = () => {
  return (
    <ul className={style.wrapper}>
      {headerTvBlockData.map(channelList => (
        <li key={channelList.title}>
          <p className={styleParent.title}>{channelList.title}</p>
          <CustomCarousel
            elementsView={6}
            elementsMove={4}
            arrowSize={16}
            space={[16, 16]}
            width='fit-shadow'
          >
            {channelList.channels.map(channel => (
              <Image
                className={style.img}
                key={channel.href}
                src={channel.img}
                alt='channel'
                width={88}
                height={58}
              />
            ))}
          </CustomCarousel>
        </li>
      ))}
    </ul>
  )
}

export default HeaderChannels
