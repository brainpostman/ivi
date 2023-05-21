import { IFilmsgGetResponse } from '@/types/films.api.interface'

const tmpFilmOne: IFilmsgGetResponse = {
  id: 1,
  name: 'Джентльмены (2019)',
  name_en: 'The Gentlemen',
  mainImg:
    '//avatars.mds.yandex.net/get-kinopoisk-image/1599028/637271d5-61b4-4e46-ac83-6d07494c7645/300x450',
  year: 2019,
  tagline: '',
  premiere: '3 декабря 2019',
  premiereRU: '13 февраля 2020',
  age: '18+',
  time: '113 мин. / 01:53',
  description:
    'Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.',
  scoreAVG: 0.0367,
  countScore: 5.3,
  genres: [
    { id: 2, name: 'комедия', name_en: null },
    {
      id: 4,
      name: 'криминал',
      name_en: null,
    },
    {
      id: 5,
      name: 'боевик',
      name_en: null,
    },
  ],
  countries: [
    {
      id: 4,
      name: 'Великобритания',
    },
    {
      id: 5,
      name: 'США',
    },
  ],
}

export const filmsListData: IFilmsgGetResponse[] = new Array(19)
  .fill(tmpFilmOne)
  .map((film, index) => ({ ...film, id: index + 1 }))
