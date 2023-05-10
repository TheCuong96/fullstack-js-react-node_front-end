import axios from 'axios';

const userApi = {
    registerUser(dataForm) {
        return axios
            .post('http://localhost:3000/api/v1/register', {
                ...dataForm,
            })
            .then(function (response) {
                console.log('response:', response);
                return response;
            })
            .catch(function (error) {
                console.log('error:', error);
                return error;
            });
    },
    loginUser(dataForm) {
        return axios
            .post('http://localhost:3000/api/v1/login', {
                ...dataForm,
            })
            .then(function (response) {
                console.log('response:', response);
                return response;
            })
            .catch(function (error) {
                console.log('error:', error);
                return error;
            });
    },
};

export default userApi;
