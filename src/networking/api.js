const host_meteo = "https://api.meteo.lt/v1";
const host_server = "https://pvpk299-back.azurewebsites.net";

export default function getData(host, endpoint) {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${host}/${endpoint}`, options)
        .then(response => {
            return response.json().then(data => {
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log(data);
                return data;
            })
        }).catch(error => {
            console.error('There was an error!', error);
        });
}

export function fetchSolarData(fromID, toID) {
    return getData(host_server, `api/SolarData/GetByIDFromTo/${fromID}/${toID}`);
}

