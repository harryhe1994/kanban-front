import axios from 'axios';

let base = '';

// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, {params: params});
};

export const removeUser = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editUser = params => {
    return axios.get(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
    return axios.get(`${base}/user/add`, {params: params});
};

export const requestLogin = params => {
    return new Promise(function (resolve, reject) {
        resolve({ msg: 'suc', code: 200, user:{
                id: 1,
                username: 'admin',
                password: '123456',
                // avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
                avatar: 'https://avatars3.githubusercontent.com/u/33508394?s=400&u=108ffd636ad52595d6fa73db21fce6cb40b48057&v=4',
                name: 'admin'
            } });
    });
};