import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { Meta } from '@storybook/react'
import React from 'react'
import { BiDevices } from 'react-icons/bi'
import {
  FaApple,
  FaGooglePlay,
  FaLinkedinIn,
  FaOdnoklassniki,
  FaTelegramPlane,
  FaTv,
  FaTwitter,
  FaViber,
  FaVk,
} from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'

const icons = {
  empty: <></>,
  linkedin: <FaLinkedinIn />,
  OK: <FaOdnoklassniki />,
  Telegram: <FaTelegramPlane />,
  Twitter: <FaTwitter />,
  Viber: <FaViber />,
  VK: <FaVk />,
}

const iconsforTypeIconCircle = {
  empty: <></>,
  linkedin: <FaLinkedinIn />,
  OK: <FaOdnoklassniki />,
  Telegram: <FaTelegramPlane />,
  Twitter: <FaTwitter />,
  Viber: <FaViber />,
  VK: <FaVk />,
  Apple: <FaApple />,
  GooglePlay: <FaGooglePlay />,
  TV: <FaTv />,
  'Все устройства': <BiDevices />,
  email: <GoMail />,
  phone: <FiPhone />,
}

const meta: Meta = {
  title: 'UI/BasicBtn',
  parameters: {
    docs: {
      description: {
        component: 'Самая часто используемая кнопка сайта',
      },
    },
    backgrounds: { default: 'darkSoft' },
  },
  component: BasicBtn,
  argTypes: {
    children: {
      name: 'label',
      description: 'Текст кнопки',
      if: {
        arg: 'btnType',
        eq: 'text',
      },
    },

    href: {
      name: 'url',
      description: 'Ссылка',
    },

    navlink: {
      table: {
        disable: true,
      },
    },

    btnType: {
      name: 'variant',
      description: 'Вариант внешнего вида',
      control: 'select',
    },

    target: {
      description: 'Поведение при клике',
      options: ['_blank', '_parent', '_self', '_top'],
      if: {
        arg: 'href',
        truthy: true,
      },
    },

    title: {
      description: 'Главный текст',
      defaultValue: '',
      if: {
        arg: 'btnType',
        neq: 'text',
      },
    },

    suptitle: {
      description: 'Надзголовок',
      defaultValue: '',
      if: {
        arg: 'btnType',
        neq: 'text',
      },
    },

    icons: {
      name: 'icon',
      description: 'Иконка',
      options: Object.keys(icons),
      mapping: icons,
      control: 'select',
      if: {
        arg: 'btnType',
        neq: 'text',
      },
    },
    circle: {
      description: 'Красный кружок',
    },

    dark: {
      description: 'В оттенках чёрного',
    },
  },
}

export const Primary = ({
  children,
  icons,
  ...props
}: {
  children: string
  icons?: React.ReactElement
} & typeof BasicBtn) => (
  <BasicBtn {...props}>
    {icons}
    {children}
  </BasicBtn>
)

Primary.args = {
  children: 'Написать в чате',
  btnType: 'text',
  href: '',
  target: '_blank',
  title: '',
  suptitle: '',
  circle: false,
  dark: false,
}

export default meta
