const fetch = require('node-fetch');
const {logger, errorLogger} = require('./logger');

const getPhrases = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                errorLogger.error(err);
                reject('Error of getting phrases');
            });   
    })
}

module.exports = {
    getPhrases
}