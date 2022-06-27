import {formatResults} from "next/dist/lib/eslint/customFormatter";

export const convertDate = (time) => {
    return new Date(time).toLocaleDateString('id-id', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // weekday: 'short'
    })
}

export const convertDateTime = (time) => {
    return new Date(time).toLocaleDateString('id-id', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        // weekday: 'short'
    })
}

export const dateToPassword = (time) => {
    const date = new Date(time)
    const dateOfMonth = date.getDate() < 10 ? ("0" + date.getDate()) : (date.getDate())
    const monthOfYear = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)
    return dateOfMonth + "" + monthOfYear + date.getFullYear()
}

export const calculateYear = (time) => {
    const dateInput = new Date(time)
    const currentDate = new Date()
    console.log(dateInput)
    const result = currentDate - dateInput

    // return new Date(result)
    return new Date(result).getFullYear() - 1970
    // const dateOfMonth = date.getDate() < 10 ? ("0"+date.getDate()) : (date.getDate())
    // const monthOfYear = (date.getMonth()+1) < 10 ? ("0"+(date.getMonth()+1)) : (date.getMonth()+1)
    // return dateOfMonth+""+monthOfYear+date.getFullYear()
}

export const getDaysToToday = (time) => {
    const diff = new Date(time).getTime() - new Date().getTime()
    const msInDay = 1000 * 3600 * 24;

    return parseInt(diff / msInDay)
}

export const calculateEstimatedTime = (startDate, endDate) => {
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime()
    const msInDay = 1000 * 3600 * 24;
    const result = parseInt(diff / msInDay)
    if (result < 1)
        return 1
    else
        return result
}

export const calculateDiffDay = (startDate, endDate) => {
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime()
    const msInDay = 1000 * 3600 * 24;

    return parseInt(diff / msInDay)
}

export const calculateDiffHour = (startDate, endDate) => {
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime()
    const msInHour = 1000 * 3600;
    return parseFloat(diff / msInHour)
}