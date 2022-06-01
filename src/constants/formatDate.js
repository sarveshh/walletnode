const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`
    let day = `${d.getDate()}`
    const year = d.getFullYear();
    let dayOnDate = d.getDay();
    const monthLong = d.toLocaleString('default', { month: 'long' });


    switch (dayOnDate) {
        case 0:
            dayOnDate = 'Sunday';
            break;
        case 1:
            dayOnDate = 'Monday';
            break;
        case 2:
            dayOnDate = 'Tuesday';
            break;
        case 3:
            dayOnDate = 'Wednesday';
            break;
        case 4:
            dayOnDate = 'Thursday';
            break;
        case 5:
            dayOnDate = 'Friday';
            break;
        case 6:
            dayOnDate = 'Saturday';
            break;

        default:
            break;
    }

    if (month.length < 2) {
        month = `0${month}`
    }
    if (day.length < 2) {
        day = `0${day}`
    }

    const formattedDate = [year, month, day].join('-')

    return { formattedDate, dayOnDate, monthLong, year, day }
}

export default formatDate