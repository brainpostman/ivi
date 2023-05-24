import { localizeDateString } from '@/formatters/localizeDateString.format';

export function validateComment(minLength: number, maxLength: number, comment: string): boolean {
    if (comment.length < minLength || comment.length > maxLength) {
        return false;
    } else {
        return true;
    }
}

export function trimComment(comment: string) {
    return comment.trim().replace(/\s+/g, ' ');
}

export function buildDateString(date: Date, locale: string) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toLocaleDateString() === today.toLocaleDateString()) {
        return locale === 'ru' ? 'сегодня' : 'today';
    } else if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
        return locale === 'ru' ? 'вчера' : 'yesterday';
    } else {
        return localizeDateString(date, locale);
    }
}
