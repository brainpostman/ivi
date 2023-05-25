import { useSetListParam } from '@/hooks/useSetListParam';
import { useEffect } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import style from './SortDirection.module.scss';
import { useTranslation } from 'next-i18next';

const defaultDirections = [
    { id: 1, name: 'ASC', view: 'Вверх', isSelect: false },
    { id: 2, name: 'DESC', view: 'Вниз', isSelect: false },
];

const SortDirection = () => {
    const { t } = useTranslation('movies');
    const { list: directions, onClickListEl } = useSetListParam(
        t('sortDirections', { returnObjects: true }),
        'order',
        {
            filterType: 'radio',
        }
    );

    const currentDirection = directions.find((el) => el.isSelect);
    const nextDirection = directions.find((el) => !el.isSelect);

    const onClickDirect = (_param: string) => () => {
        onClickListEl(_param)();
    };

    useEffect(() => {
        onClickListEl('ASC')();
    }, []);

    if (!currentDirection) return <></>;

    return (
        <div className={style.wrapper} onClick={onClickDirect(nextDirection?.name || '')}>
            <GoArrowLeft className={currentDirection?.name === 'DESC' ? style.down : ''} />
            <p>{currentDirection?.view}</p>
        </div>
    );
};

export default SortDirection;
