const axios = require('axios');

const httpRequest = () => axios.get('http://localhost:8080')
    .then((response) => {
        // handle success
        // console.log(response);
        console.time();
        console.log('[Success] called');
        console.timeEnd();
    })
    .catch((error) => {
        // handle error
        console.time();
        console.log('[Error] called');
        console.timeEnd();
        // console.log(error);
    })
    .then(() => {
        // always executed
    });

const timer = setInterval(httpRequest, 100);