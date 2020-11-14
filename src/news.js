const fetch = require('node-fetch');
const {logger, errorLogger} = require('./logger');

const getNews = (url) => {
    return new Promise((resolve, reject) => {
        const timeOut = setTimeout(() => {
            errorLogger.error('Timeout of getting news');
            reject('Timeout of getting news');
        }, 8000);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                clearTimeout(timeOut);
                try {
                    data = data.map(item => {
                        item.dateFormatted = getFormattedDate(item.ptime + 000);
                        return item;
                    })
                } catch(e) {
                    logger.error('Unable to format date');
                }
                resolve(data);
            })
            .catch(err => {
                errorLogger.error(err);
                reject('Error of getting news');
            });   
    })
}

const getFormattedDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

module.exports = {
    getNews
}