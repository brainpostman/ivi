module.exports = {
    i18n: {
        defaultLocale: 'ru',
        locales: ['ru', 'en'],
        localeDetection: false,
    },
    reloadOnPrerender: true,
    //vercel deployment fix
    localePath:
        typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
    ns: [
        'header',
        'auth_modal',
        'home',
        'common',
        'footer',
        'error',
        'movies',
        'admin',
        'watch',
        'review',
    ],
};
