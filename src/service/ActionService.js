import httpHelper from '../common/util/HttpHelper'
// import axios from "axios/index";
let host = '';

const deleteActionById = async (id) => {
    console.log('delete', id);
    var result = await httpHelper.del(`${host}/api/action/` + id, id);
    return result.data;
};

const updateAction = async (action) => {
    var result = await httpHelper.put(`${host}/api/action`, action);
    console.log(result);
    return result.data;
};

const addAction = async (action) => {
    var result = await httpHelper.post(`${host}/api/action`, action);
    return result.data;
};

const findAll = async () => {
    var result = await httpHelper.get(`${host}/api/action/actions`);
    return result.data;
};

const findActionByTime = async () => {
    var result = await httpHelper.get(`${host}/api/action/time`);
    console.log(result.data);
    return result.data;
};

export default {
    deleteActionById,
    updateAction,
    addAction,
    findAll,
    findActionByTime
}
