import { IMovieCarouselElem } from '@/types/moviecarousel.interface'

const data = [
	{
		img: 'https://thumbs.dfs.ivi.ru/storage6/contents/5/9/9f89177d502fc37592017159fe923f.jpg/234x360//?q=85',
		title: 'Клуб Винкс – Школа волшебниц',
		isFree: true,
		rating: 8.0,
		bestIndicator: 'сюжет',
		country: 'Италия',
		date: '2004-2019',
		genre: 'Фэнтези',
		duration: '8 сезонов',
	},
	{
		img: 'https://thumbs.dfs.ivi.ru/storage28/contents/0/c/ee49b7f16535f8ca2467904800da81.jpg/234x360//?q=85',
		title: 'Шоу Патрика Стара',
		isFree: false,
		rating: 7.4,
		bestIndicator: 'актёры',
		date: '2021',
		country: 'США',
		genre: 'Сериалы',
		duration: '1 сезон',
	},
	{
		img: 'https://thumbs.dfs.ivi.ru/storage37/contents/2/2/29f0af23c55d95f2c205549d25feaa.jpg/234x360//?q=85',
		title: 'Колобанга',
		isFree: true,
		rating: 8.5,
		bestIndicator: 'сюжет',
		date: '2015',
		country: 'Россия',
		genre: 'Приключения',
		duration: '1 сезон',
	},
	{
		img: 'https://thumbs.dfs.ivi.ru/storage5/contents/3/0/8612b0af0fd84731ad4fceee80cb20.jpg/234x360//?q=85',
		title: 'Герои Энвелла',
		isFree: true,
		rating: 8.5,
		bestIndicator: 'сюжет',
		date: '2017-2021',
		country: 'Россия',
		genre: 'Для детей',
		duration: '1 сезон',
	},
]

export const movieCarouselData: IMovieCarouselElem[] = [
	...data,
	...data,
	...data,
].map((el, index) => ({ id: index + 1, ...el }))
