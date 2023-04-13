import { NewUser } from '../models/user.js';


const host_meteo = "https://api.meteo.lt/v1";
const host_server = "https://pvpk299-back.azurewebsites.net";
// const host_server = "https://localhost:7257";

const HEADERS = { 'Content-Type': 'application/json' };

export default function fetchData(host, endpoint, options) {
    return fetch(`${host}${endpoint}`, options)
        .then(response => {
            if (!response.ok) {
                return response.json()
                    .catch(() => {
                        // Couldn't parse the JSON
                        throw new Error(response.status);
                    })
                    .then(({ data }) => {
                        // Got valid JSON with error response, use it
                        throw new Error(data && data.message);
                    });
            }
            // Successful response, parse the JSON and return the data
            return response.json();
        }).catch(error => {
            console.error('There was an error!', error);
        });
}

export function getData(host, endpoint) {
    const options = {
        method: 'GET',
        headers: HEADERS,
        mode: 'cors',
    };
    return fetchData(host, endpoint, options);
}

export function postData(host, endpoint, body) {
    const options = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body)
    };
    return fetchData(host, endpoint, options);
}

export function registerUser(newUser) {
    if (!(newUser instanceof NewUser)) {
        throw new Error('trying to register user, which is not of type NewUser');
    }
    return postData(host_server, `/api/auth/register`, newUser)
}

export function fetchSolarData(fromID, toID) {
    return getData(host_server, `/api/SolarData/GetByIDFromTo/${fromID}/${toID}`);
}

export function getAllStations() {
    return getData(host_server, `/api/weather/stations`);
}

export function getCurrentWeather() {
    return getData(host_server, `/api/weather/current`);
}