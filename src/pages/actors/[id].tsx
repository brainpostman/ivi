import ExpandInfo from "@/components/ExpandInfo/ExpandInfo"
import style from "./actors.module.scss"
interface Films{
	id:number,
	image:string,
	year:string,
	title: string,
	rating:string
}
const Films=[
	{
	id:1,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
    title:'Человек-Паук: Через вселенные 2',
    rating:'7,1'
    },
	{
	id:2,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:3,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:4,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:5,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:6,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:7,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:8,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:9,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	},
	{
	id:10,
	image:'//thumbs.dfs.ivi.ru/storage23/contents/e/5/083ebacbcddba0f89bb4e89d9f64ef.jpg/172x264/?q=60',
	year:'2022',
	title:'Человек-Паук: Через вселенные 2',
	rating:'7,1'
	}
			
]
export default function Actor() {

	return <div className={style.wrapper}>
		<button>{'<'}Назад</button>
		<div className={style.persone_conteiner}>
		<div className={style.img_conteiner}>
			<img src="https://thumbs.dfs.ivi.ru/storage5/contents/9/6/b7f9eef3eaeb3d500cd994fb130047.jpg/120x144/?q=85" alt="ofofofo"/>
		</div>
		<div className={style.info_conteiner}>
			<h1>Оскар Айзек</h1>
			<h4>Oscar Isaak</h4>
			
			<h4>Оскар Айзек (Oscar Isaak Hernandez) - американский актер, 
				ставший известным благодаря главной роли в картине братьев <ExpandInfo>Коэн «Внутри Льюина Дэвиса».</ExpandInfo></h4>
	
				<div className={style.info_buttons}>
				<a>47 фильмов</a>
				<a>Биография</a>
				</div>
		</div>
		</div>
		<div className={style.films_wrapper}>
			<div className={style.films_header}>
			<h3>Полная фильмография</h3>
			<h4>47 фильмов</h4>
			</div>
			<div className={style.films_conteiner}>
				{Films.map((film,index)=>(
					<div key={film.id}
					className={style.film}>
						<img src={film.image} alt={film.title}/>
						<div className={style.film_info}>
						<h3>{film.year}</h3>
						<h3>{film.title}</h3>
						<h4>Рейтинг Иви:{film.rating}</h4>
						</div>
						<button>Подробнее</button>
					</div>
				))}
				<button>Eще 39 фильмов</button>
			</div>
			</div>
			<div className={style.biografy}>
				<h2>Биография</h2>
				<h3>Оскар Айзек родился 9 марта 1980 года в Гватемале. За свою яркую внешность он должен быть благодарен тому жгучему смешению кровей, что течет в его жилах: его мать - гватемалка, отец - кубинец, дедушка по линии матери - француз.<ExpandInfo>

Когда Оскар был еще маленьким, семья переехала в США, детство и юность мальчик провел в солнечном Майами, штат Калифорния. Там, на заднем дворе их дома, Оскар со своей сестрой устраивали целые театральные постановки для семьи и соседей. Кроме театра, Айзек всегда увлекался музыкой и даже состоял в нескольких музыкальных коллективах в подростковом возрасте.

Актерскому мастерству Оскар обучался в престижной Juilliard School, которую закончил в 2005 году. А в 2006 году он получил уже свою первую значительную роль в большом кино. Это была библейская драма «История Рождества», где Оскар изображал Иосифа, мужа матери Иисуса, Марии.

Далее были второстепенные роли в картинах: «Че» (2008) Содерберга, «Совокупность лжи» (2008) с Расселом Кроу и Леонардо ДиКаприо, «Агора» (2009) с Рейчел Вайнц, «Робин Гуд» (2010) Ридли Скотта с Расселом Кроу.

В мрачной фантазии от Зака Снайдера, «Запрещенный удар» (2011), Оскару удалось проявить не только свои актерские, но и вокальные данные: он записал песню для саундтрека к фильму. В том же 2011 году актер снимается еще в трех заметных картинах: боевике «Драйв» с Райаном Гослингом, мелодраме Мадонны «Мы. Верим в любовь» и романтической комедии «10 лет спустя». В 2012 году он появляется на экране в блокбастере «Эволюция Борна».

Удача и потрясающая актерская работа, за которую Оскар Айзек был номинирован на «Золотой глобус», ждали его в 2013 году. Братья Коэн искали для своего нового фильма «Внутри Льюина Дэвиса» музыкально одаренного актера или артистичного вокалиста, и их выбор пал на Оскара. Премьера картины прошла в рамках конкурсного показа на Каннском фестивале. В итоге фильм получил Гран-при жюри, а игру Айзека критики и зрители назвали феноменальной.</ExpandInfo></h3>
			</div>
		</div>

}
