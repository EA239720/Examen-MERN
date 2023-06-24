function formatDate(date : Date) {
    const aux = new Date(date);

    const day = aux.getDate();
    const month = aux.getMonth() <= 9 ? '0' + (aux.getMonth() + 1) : aux.getMonth() + 1
    const year = aux.getFullYear();

    return day + '/' + month + '/' + year 
}

export default formatDate;