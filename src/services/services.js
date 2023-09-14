import axios from "axios";

const URL = 'https://calendar-test.k3s.bind.by/api';


export const getDayInformation = async (year, month) => {
    const dayData = await axios.get(`${URL}/records/?year=${year}&month=${month + 1}`,
        {headers: {Authorization: `Bearer ${document.cookie.match(/token=(.+?)(;|$)/)[1]}`}})

    return dayData.data;
}

export const getDay = async (splitDate, date) => {
    console.log(date);
    const dayData = await axios.get(`${URL}/records/?year=${splitDate[0]}&month=${splitDate[1]}&day=${splitDate[2]}`,
        {headers: {Authorization: `Bearer ${document.cookie.match(/token=(.+?)(;|$)/)[1]}`}})


    return dayData.data[date];
}

export const addTask = async (task) => {
    const dayData = await axios.post(`${URL}/records/`,
        task, {headers: {Authorization: `Bearer ${document.cookie.match(/token=(.+?)(;|$)/)[1]}`}});
}


export const login = async (data) => {
    try {
        const response = await axios.post(`${URL}/login/`, data);
        const token = response.data.access;
        document.cookie = `token = ${token}`;
        return token;
    } catch (error) {
        if (error.response) {
            const errors = error.response.data;
            return errors;
        }
    }
};
