import httpHelper from '../common/util/HttpHelper'
// import axios from "axios/index";
let host = '';

const deleteDefectById = async (id) => {
    console.log('delete', id);
    let result = await httpHelper.del(`${host}/api/defect/` + id, id);
    return result.data;
};

const updateDefect = async (defect) => {
    let result = await httpHelper.put(`${host}/api/defect`, defect);
    console.log(result);
    return result.data;
};

const addDefect = async (defect) => {
    let result = await httpHelper.post(`${host}/api/defect`, defect);
    return result.data;
};

const findAll = async () => {
    let result = await httpHelper.get(`${host}/api/defect`);
    return result.data;
};

const findDefectByIteration = async (iteration) => {
    let result = await httpHelper.get(`${host}/api/defect/iteration/` + iteration);
    return result.data;
};

const getDefectByPage = async (page) => {
    let result = await httpHelper.get(`${host}/api/defect/page/` + page);
    return result.data;
};

const getTotalCount = async () => {
    let result = await httpHelper.get(`${host}/api/defect/count/`);
    return result.data;
};

export default {
    addDefect,
    updateDefect,
    deleteDefectById,
    findAll,
    findDefectByIteration,
    getDefectByPage,
    getTotalCount
}
