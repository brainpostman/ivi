import React, { useEffect, useState } from 'react'
import style from "./TopTenList.module.scss"

interface Film {
    title: string;
    imageUrl: string;
  }
const filmsTop:Film[]=[
    {
        title:'фильм 1',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 2',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 3',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 4',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 5',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 6',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 7',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 8',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 9',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
    {
        title:'фильм 10',
        imageUrl:'https://thumbs.dfs.ivi.ru/storage4/contents/2/c/3b8e2a957b926355725e1237e188bf.jpg//304x620//?q=85'
    },
];
 const TopTenList: React.FC=()=> {
    const [position,setPosition]=useState(0)

    const [activeRight,setActiveRight]=useState(true)
    const [activeLeft,setActiveLeft]=useState(false)

    const setLeft=()=>{
        if (position > 0) setPosition(position - 5);
         
    }

    const setRight=()=>{
        if (position === 0) setPosition(position + 5);
    }
    useEffect(() => {
        setActiveRight(position !== 5);
        setActiveLeft(position !== 0);
      }, [position]);

  return (
    <div className={style.main}>
        <h2>Топ 10 за неделю</h2>
        <div className={style.sliderTop10}>
                {filmsTop.map((film,index) => (
                    <div key={index}
                    className={style.sliderBlock}
                    style={{ transform: `translateX(-${(position*110)}%)`}}>
                            <img src={film.imageUrl} alt={film.title} />
                            <h3>{ index + 1}</h3>
                    </div>
                ))}
        </div>
        {activeLeft && (
        <button onClick={setLeft} className={style.buttonPrev}>
          {"<"}
        </button>
      )}
      {activeRight && (
        <button onClick={setRight} className={style.buttonNext}>
          {">"}
        </button>
      )}
    </div>
    
  )
}
export default TopTenList;