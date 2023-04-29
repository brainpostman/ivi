import auth_modal from '../../public/locales/ru/auth_modal.json';
import header from '../../public/locales/ru/header.json';
import home from '../../public/locales/ru/home.json';
import error404 from '../../public/locales/ru/error404.json';

export interface Resources {
    auth_modal: typeof auth_modal;
    header: typeof header;
    home: typeof home;
    error404: typeof error404;
}
