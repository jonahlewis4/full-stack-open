import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(result => result.data)
}

const create = newObject => {
    return axios
        .post(`${baseUrl}`, newObject)
        .then(result => result.data)
}

const remove = person => {
    return axios
        .delete(`${baseUrl}/${person.id}`)
        .then((result) => {console.log(`successfully deleted ${person.name} from database`)})
        .catch((result) => {console.log(`successfully deleted ${person.name} from database`)})
}
const update = (id, person) => {
    console.log(id, person)
    return axios
        .put(`${baseUrl}/${id}`, person)
        .then((result) => result.data)
}

export default {
    getAll,
    create,
    remove,
    update
}