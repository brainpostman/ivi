import { i18n } from 'next-i18next';
import { Session } from 'next-auth';

i18n?.loadNamespaces(['auth_modal']);

/*
    * @param {string} email - почта
    * @returns string

*/

export function validateEmail(email: string): string {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+|[а-яА-Я0-9-]+(?:\.[а-яА-Я0-9-]+)+)$/;
    if (emailRegex.test(email)) {
        return '';
    } else {
        return (
            i18n?.t('auth_modal:error-messages.incorrect-email') ?? 'Некорректная электронная почта'
        );
    }
}

/*
    * @param {string} password - пароль
    * @param {string} email - почта
    * @returns string[]

*/

export function validatePassword(password: string, email = ''): string[] {
    let messages: string[] = [];
    if (password.length === 0) {
        messages.push(
            i18n?.t('auth_modal:error-messages.no-empty-pass') ?? 'Пожалуйста, введите пароль'
        );
        return messages;
    }
    if (password.length < 6 || password.length > 24) {
        messages.push(
            i18n?.t('auth_modal:error-messages.length') ??
                'Длина пароля должна быть не меньше 6 и не больше 24 символов'
        );
    }
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"\\/[\]{}|`~]+$/;
    if (!passwordRegex.test(password)) {
        messages.push(
            i18n?.t('auth_modal:error-messages.no-pattern-match') ??
                'Пароль должен содержать только символы латинского алфавита, цифры и спецсимволы'
        );
    }
    if (email !== '' && email === password) {
        messages.push(
            i18n?.t('auth_modal:error-messages.no-email-match') ??
                'Пароль не должен совпадать с вашей почтой'
        );
    }
    return messages;
}

/*
    * @param {string} password - пароль
    * @param {string} confirmation - пароль
    * @returns string

*/

export function validateConfirmedPassword(password: string, confirmation: string): string {
    if (password === confirmation) {
        return '';
    } else {
        return (
            i18n?.t('auth_modal:error-messages.no-confirmation-match') ?? 'Пароли должны совпадать'
        );
    }
}

/*
    * @param {Session | null} inputSession - сессия
    * @returns Session | null

*/

export function getSerializableSession(inputSession: Session): Session | null {
    if (!inputSession) {
        return null;
    }
    for (let key in inputSession.user) {
        if (!inputSession.user[key]) {
            inputSession.user[key] = null;
        }
    }
    return inputSession;
}
