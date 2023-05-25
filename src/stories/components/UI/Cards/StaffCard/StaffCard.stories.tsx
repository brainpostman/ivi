import StaffCard from '@/components/UI/Cards/StaffCard/StaffCard'
import { staffDataResponse } from '@/data/staff.data'
import { IStaffGetResponse } from '@/types/api/staffs.api.interface'
import { Meta, ReactRenderer, StoryContext, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof StaffCard>

const meta: Meta = {
  title: 'UI/Cards/StaffCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Карточка участника',
      },
    },
  },
  component: StaffCard,
  argTypes: {
    staff: { table: { disable: true } },
    name: {
      description: 'Имя участника',
    },
    name_en: {
      description: 'Имя участника на английском',
    },
    type: {
      description: 'Тип участника',
      options: [
        'director',
        'artist',
        'actor',
        'scenario',
        'montage',
        'operator',
        'producer',
        'compositor',
      ],
      control: 'select',
    },
    img: {
      name: 'avatar',
      description: 'Аватар участника',
    },
    biography: {
      description: 'Биография',
    },
  },
}

interface IPrimary {
  name: string
  name_en?: string
  img: string
  type: string
  biography: string
}

export const Primary = (
  {
    name: nameIncoming,
    name_en: nameEnIncoming,
    type,
    biography,
    img,
  }: IPrimary,
  context: StoryContext<ReactRenderer>
) => {
  const { locale } = context.globals

  const name = locale === 'en' && nameEnIncoming ? nameEnIncoming : nameIncoming
  const staff: IStaffGetResponse = {
    id: 1,
    name,
    types: [{ name: type }],
    biography,
    img,
  }
  return <StaffCard staff={staff} />
}

Primary.args = {
  name: 'Участник 1',
  name_en: 'Staff 1',
  type: 'actor',
  biography: 'biography',
  img: '',
}

export default meta
