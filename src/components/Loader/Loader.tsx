import style from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={style.wrapper}>
            <p className={style.loader}></p>
        </div>
    );
};

export default Loader;
