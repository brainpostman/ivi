import { IFooterListItem } from '@/types/IFooterListItem';
import styles from './FooterList.module.scss';
import FooterListItem from '../FooterListItem/FooterListItem';

interface IFooterListProps {
    items: IFooterListItem[];
    className?: string;
}

const FooterList = ({ items, className }: IFooterListProps) => {
    return (
        <div className={`${styles.list} ${className}`}>
            {items.map((item) => {
                return <FooterListItem key={item.url} item={item} />;
            })}
        </div>
    );
};

export default FooterList;
