import axios from 'axios'

const get = async (url, params) => await axios.get(url, {
    params: {
        ...params
    }
})

const post = async (url, data) => await axios.request({
    url: url,
    method: 'POST',
    data: data
})

const del = async (url, params) => await axios.delete(url, {
    params: {
        ...params
    }
})

const put = async (url, data) => await axios.request({
    url: url,
    method: 'PUT',
    data: data
})

export default {
    get,
    post,
    del,
    put
}