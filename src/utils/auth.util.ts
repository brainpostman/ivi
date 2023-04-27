import axios from 'axios';

type CheckEmailResponse = {
    status: number;
};

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
            return 'Произошла непредвиденная ошибка';
        }
    }
}

export function validateEmail(email: string): string {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+|[а-яА-Я0-9-]+(?:\.[а-яА-Я0-9-]+)+)$/;
    if (emailRegex.test(email)) {
        return '';
    } else {
        return 'Некорректная электронная почта';
    }
}

export function validatePassword(password: string): string[] {
    let messages: string[] = [];
    if (password.length === 0) {
        messages.push('Пожалуйста, введите пароль');
        return messages;
    }
    if (password.length < 6) {
        messages.push('Пароль должен иметь как минимум 6 символов');
    }
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"\\/[\]{}|`~]+$/;
    if (!passwordRegex.test(password)) {
        messages.push(
            'Пароль должен содержать только символы латинского алфавита, цифры и спецсимволы'
        );
    }
    return messages;
}

export function validateConfirmedPassword(password: string, confirmation: string) {
    if (password === confirmation) {
        return '';
    } else {
        return 'Пароли должны совпадать';
    }
}
