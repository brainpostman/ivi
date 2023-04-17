import { IFooterListItem } from '@/types/IFooterListItem';
import styles from './FooterListItem.module.scss';
import Link from 'next/link';

interface IFooterListItemProps {
    item: IFooterListItem;
}

const FooterListItem = ({ item }: IFooterListItemProps) => {
    return (
        <li>
            {item.linkType === 'internal' ? (
                <Link href={item.url} className={styles.text}>
                    {item.text}
                </Link>
            ) : (
                <a href={item.url} className={styles.text}>
                    {item.text}
                </a>
            )}
        </li>
    );
};

export default FooterListItem;
