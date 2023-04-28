import axios from 'axios';
import { i18n } from 'next-i18next';

type CheckEmailResponse = {
    status: number;
};

i18n?.loadNamespaces(['auth_modal']);

export async function checkEmailVacancy(email: string): Promise<string> {
    try {
        const response = await axios.get<CheckEmailResponse>(
            `http://localhost:3000/check-email/${encodeURIComponent(email)}`
        );
        if (response.status === 200) {
            return 'register';
        } else {
            throw new Error();
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                return 'login';
            }
            console.error('AxiosError: ', err.message);
            return err.message;
        } else {
            console.error('Error: ', err);
            return i18n?.t('error-messages.unforeseen-error') ?? 'Произошла непредвиденная ошибка';
        }
    }
}

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

export function validatePassword(password: string): string[] {
    let messages: string[] = [];
    if (password.length === 0) {
        messages.push(i18n?.t('error-messages.min-length') ?? 'Пожалуйста, введите пароль');
        return messages;
    }
    if (password.length < 6) {
        messages.push(
            i18n?.t('error-messages.min-length') ?? 'Пароль должен иметь как минимум 6 символов'
        );
    }
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"\\/[\]{}|`~]+$/;
    if (!passwordRegex.test(password)) {
        messages.push(
            i18n?.t('error-messages.no-pattern-match') ??
                'Пароль должен содержать только символы латинского алфавита, цифры и спецсимволы'
        );
    }
    return messages;
}

export function validateConfirmedPassword(password: string, confirmation: string) {
    if (password === confirmation) {
        return '';
    } else {
        return i18n?.t('error-messages.no-confirmation-match') ?? 'Пароли должны совпадать';
    }
}
