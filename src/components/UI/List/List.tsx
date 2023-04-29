interface ListProps<T> {
    items: T[];
    className?: string;
    renderItem: (item: T) => React.ReactNode;
}

export default function List<T>({ items, className, renderItem }: ListProps<T>) {
    return <ul className={className}>{items && items.map(renderItem)}</ul>;
}
