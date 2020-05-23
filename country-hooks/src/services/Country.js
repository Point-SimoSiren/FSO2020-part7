import Axios from 'axios'

const getCountry = (name) => {
    const request = Axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    return request
}

export default { getCountry }