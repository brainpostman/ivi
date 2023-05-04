import axios from 'axios';
import { i18n } from 'next-i18next';
import jwt from 'jsonwebtoken';
import { Session } from 'next-auth';

type CheckEmailResponse = {
    status: number;
};

i18n?.loadNamespaces(['auth_modal']);

const domain = 'http://localhost:3000';

export async function checkEmailVacancy(email: string): Promise<string> {
    try {
        const response = await axios.get<CheckEmailResponse>(
            `${domain}/check-email/${encodeURIComponent(email)}`
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
            return (
                i18n?.t('auth_modal:error-messages.unforeseen-error') ??
                'Произошла непредвиденная ошибка'
            );
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

export function validateConfirmedPassword(password: string, confirmation: string) {
    if (password === confirmation) {
        return '';
    } else {
        return (
            i18n?.t('auth_modal:error-messages.no-confirmation-match') ?? 'Пароли должны совпадать'
        );
    }
}

export function genDBPasswordMock(email: string) {
    const password = jwt
        .sign({ email: email }, process.env.PASS_MOCK_SECRET as string, {
            noTimestamp: true,
        })
        .split('.')[2]
        .substring(0, 24);
    return password;
}

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

export async function checkAdminRole(accessToken: string | null): Promise<boolean> {
    try {
        const checkAdmin = await axios.get(`${domain}/check-admin`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return true;
    } catch (err) {
        return false;
    }
}
