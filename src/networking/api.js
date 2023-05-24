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
            console.error('api.js:', error);
            return { "error": error };
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

export function patchData(host, endpoint, body) {
    const options = {
        method: 'PATCH',
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

export function updateUser(body) {
    return patchData(host_server, `/api/auth/update`, body)
}

export function fetchSolarDataByID(ID) {
    return getData(host_server, `/api/SolarData/GetDataByID/${ID}`);
}

export function fetchSolarData(fromID, toID) {
    return getData(host_server, `/api/SolarData/GetByIDFromTo/${fromID}/${toID}`);
}

export function fetchSolarDataByDate(dateFrom, dateTo) {
    return getData(host_server, `/api/SolarData/GetByDateFromTo/${dateFrom}/${dateTo}`);
}

export function getAllStations() {
    return getData(host_server, `/api/weather/stations`);
}

export function getCurrentWeather() {
    return getData(host_server, `/api/weather/current`);
}

export function getLatestKaunasWeather() {
    return getData(host_server, `/api/weather/observation?station=kauno-ams&date=latest`);
}

export function loginUser(email, password) {
    return getData(host_server, `/api/auth/login/${email}/${password}`);
}
export function getLastID() {
    return getData(host_server, `/api/SolarData/GetLastID`);
}