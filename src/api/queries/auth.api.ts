import axios from 'axios';
import { i18n } from 'next-i18next';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { toast } from 'react-toastify';

i18n?.loadNamespaces(['auth_modal']);

export const authAPI = {
    checkAdminRole(accessToken: string | null) {
        return checkAdminRole(accessToken);
    },
    checkEmailVacancy(email: string) {
        return checkEmailVacancy(email);
    },
    signOut(accessToken: string | null, user_id: number) {
        return signOut(accessToken, user_id);
    },
};

/*
    * @param {string | null} accessToken - токен
    * @returns Promise<boolean>

*/

export async function checkAdminRole(accessToken: string | null): Promise<boolean> {
    try {
        const checkAdmin = await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/check-admin`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (checkAdmin.data.statusCode === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

/*
    * @param {string} email - почта
    * @returns Promise<string>

*/

export async function checkEmailVacancy(email: string): Promise<string> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_PATH}/check-email/${encodeURIComponent(email)}`
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
            console.error('Error: ', err.message);
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

/*
    * @param {string | null} accessToken - токен
    * @param {numder} user_id - ID пользователя
    * @returns Promise<string | undefined>

*/

export async function signOut(
    accessToken: string | null,
    user_id: number
): Promise<string | undefined> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/logout/${user_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.data.statusCode === 200) {
            nextAuthSignOut();
            return response.data.message;
        }
    } catch (_) {
        toast.error(
            i18n?.t('auth_modal:error-messages.session-signout-failed') ??
                'Не удалось завершить сессию, пожалуйста попробуйте ещё раз или обратитесь в поддержку'
        );
    }
}
