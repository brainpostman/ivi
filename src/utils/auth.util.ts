import axios from 'axios';

async function checkEmailVacancy(email: string) {
    const response = await axios.get(`${process.env.CHECK_EMAIL_VACANCY}/${email}`);
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}
