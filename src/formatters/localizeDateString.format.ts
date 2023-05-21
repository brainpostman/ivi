export function localizeDateString(date: Date, locale: string): string {
    let dateStr = String(date.getDate());
    if (locale !== 'ru') {
        switch (dateStr[dateStr.length - 1]) {
            case '1':
                dateStr += 'st';
                break;
            case '2':
                dateStr += 'nd';
                break;
            case '3':
                dateStr += 'rd';
                break;
            default:
                dateStr += 'th';
                break;
        }
    }
    let monthStr;
    switch (date.getMonth()) {
        case 0:
            monthStr = locale === 'ru' ? 'января' : 'January';
            break;
        case 1:
            monthStr = locale === 'ru' ? 'февраля' : 'February';
            break;
        case 2:
            monthStr = locale === 'ru' ? 'марта' : 'March';
            break;
        case 3:
            monthStr = locale === 'ru' ? 'апреля' : 'April';
            break;
        case 4:
            monthStr = locale === 'ru' ? 'мая' : 'May';
            break;
        case 5:
            monthStr = locale === 'ru' ? 'июня' : 'June';
            break;
        case 6:
            monthStr = locale === 'ru' ? 'июля' : 'July';
            break;
        case 7:
            monthStr = locale === 'ru' ? 'августа' : 'August';
            break;
        case 8:
            monthStr = locale === 'ru' ? 'сентября' : 'September';
            break;
        case 9:
            monthStr = locale === 'ru' ? 'октября' : 'October';
            break;
        case 10:
            monthStr = locale === 'ru' ? 'ноября' : 'November';
            break;
        case 11:
            monthStr = locale === 'ru' ? 'декабря' : 'December';
            break;
    }
    return `${dateStr} ${monthStr} ${date.getFullYear()}`;
}
