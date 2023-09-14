import axios from "axios";

export const getDayInformation = async (year, month) => {
    const dayData = await axios.get(`https://calendar-test.k3s.bind.by/api/records/?year=${year}&month=${month + 1}`,
        {headers: {Authorization: `Bearer ${document.cookie.match(/token=(.+?)(;|$)/)[1]}`}})

    return dayData.data;
}

export const getDay = async (splitDate, date) => {
    console.log(date);
    const dayData = await axios.get(`https://calendar-test.k3s.bind.by/api/records/?year=${splitDate[0]}&month=${splitDate[1]}&day=${splitDate[2]}`,
        {headers: {Authorization: `Bearer ${document.cookie.match(/token=(.+?)(;|$)/)[1]}`}})


    return dayData.data[date];
}

export const addTask = async (task) => {
    const dayData = await axios.post(`https://calendar-test.k3s.bind.by/api/records/`,
        task, {headers: {Authorization: `Bearer ${document.cookie.match(/token=(.+?)(;|$)/)[1]}`}});
}
