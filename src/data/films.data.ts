import {
  IFilmByIdGetResponse,
  IFilmsgGetResponse,
} from '@/types/api/films.api.interface'

const tmpFilmOne: IFilmByIdGetResponse = {
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
  directors: [{ id: 1, name: 'director1', types: [{ name: 'director' }] }],
  artists: [{ id: 1, name: 'artist1', types: [{ name: 'artist' }] }],
  actors: [{ id: 1, name: 'actor1', types: [{ name: 'actor' }] }],
  compositors: [
    { id: 1, name: 'compositor1', types: [{ name: 'compositor' }] },
  ],
  montages: [{ id: 1, name: 'montage1', types: [{ name: 'montage' }] }],
  operators: [{ id: 1, name: 'operator1', types: [{ name: 'operator' }] }],
  scenario: [{ id: 1, name: 'scenario1', types: [{ name: 'scenario' }] }],
}

export const filmsListData: IFilmByIdGetResponse[] = new Array(19)
  .fill(tmpFilmOne)
  .map((film, index) => ({ ...film, id: index + 1 }))
