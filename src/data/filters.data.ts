export const genreFilterData = [
  { title: 'Артхаус', param: 'genre1' },
  { title: 'Боевики', param: 'genre2' },
  { title: 'Вестерн', param: 'genre3' },
  { title: 'Военные', param: 'genre4' },
  { title: 'Детективы', param: 'genre5' },
  { title: 'Для всей семьи', param: 'genre6' },
  { title: 'Для детей', param: 'genre7' },
  { title: 'Документальные', param: 'genre8' },
  { title: 'Драмы', param: 'genre9' },
  { title: 'Исторические', param: 'genre10' },
  { title: 'Катастрофы', param: 'genre11' },
  { title: 'Комедии', param: 'genre12' },
  { title: 'Криминальные', param: 'genre13' },
  { title: 'Мелодрамы', param: 'genre14' },
  { title: 'Мистические', param: 'genre15' },
  { title: 'По комиксам', param: 'genre17' },
  { title: 'Приключения', param: 'genre18' },
  { title: 'Спорт', param: 'genre19' },
  { title: 'Триллеры', param: 'genre20' },
  { title: 'Ужасы', param: 'genre21' },
  { title: 'Фантастика', param: 'genre22' },
  { title: 'Фэнтези', param: 'genre23' },
]

export const countryFilterData = [
  { title: 'Русские', param: 'country1' },
  { title: 'Зарубежные', param: 'country2' },
  { title: 'Советское кино', param: 'country3' },
  { title: 'Американские', param: 'country4' },
  { title: 'Корейские', param: 'country5' },
  { title: 'Турецкие', param: 'country6' },
]

export const yearsFilterData = [
  { title: 'Фильмы 2023 года', param: '2023' },
  { title: 'Фильмы 2022 года', param: '2022' },
  { title: 'Фильмы 2021 года', param: '2021' },
  { title: 'Фильмы 2020 года', param: '2020' },
]

export const novetlyFilterData = [
  { name: 'Новинки', href: 'https://www.ivi.ru/new/animation-new' },
  { name: 'Подборки', href: 'https://www.ivi.ru/collections' },
  {
    name: 'Иви.Рейтинг',
    href: 'https://www.ivi.ru/series/all?ivi_rating_10_gte=7&sort=ivi&rating_part=main&rating_model=ready',
  },
  { name: 'Скоро на Иви', href: 'https://www.ivi.ru/new/soon-ivi' },
  { name: 'Трейлеры', href: 'https://www.ivi.ru/trailers' },
  { name: 'Что посмотреть', href: 'https://www.ivi.ru/goodmovies' },
  { name: 'Фильмы в HD', href: 'https://www.ivi.ru/collections/movies-hd' },
  { name: 'Выбор Иви', href: 'https://www.ivi.ru/collections/vyibor-ivi' },
  {
    name: 'Новинки подписки',
    href: 'https://www.ivi.ru/collections/very-new-svod?sort=priority_in_collection',
  },
  {
    name: 'Фильмы Amediateka',
    href: 'https://www.ivi.ru/collections/filmyi-amediateka',
  },
  {
    name: 'Популярные фильмы',
    href: 'https://www.ivi.ru/collections/best-movies',
  },
  { name: 'Фильмы Иви', href: 'https://www.ivi.ru/collections/ivi-originals' },
].map((novetly, index) => ({ ...novetly, id: index + 1 }))
