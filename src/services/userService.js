import axios from './axios'

const userApi = {
  registerUser(dataForm) {
    return axios
      .post('/api/v1/register', {
        ...dataForm
      })
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      })
  },
  loginUser(dataForm) {
    return axios
      .post('/api/v1/login', {
        ...dataForm
      })
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      })
  },
  fetchAllUser(page, limit) {
    return axios
      .get(`/api/v1/user/read?page=${page}&limit=${limit}`)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      })
  },
  deleteUser(user) {
    return axios
      .delete(`/api/v1/user/delete`, {
        data: { id: user.id }
      })
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      })
  },

  fetchGroup() {
    return axios
      .get(`/api/v1/group/read`)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      })
  },

  createNewUser(userData) {
    return axios
      .post(`/api/v1/user/create`, { ...userData })
      .then(function (response) {
        console.log('createNewUser:', response)
        return response
      })
      .catch(function (error) {
        console.log('error:', error)
        return error
      })
  },

  updateUser(userData) {
    return axios
      .put(`/api/v1/user/update`, { ...userData })
      .then(function (response) {
        console.log('updateUser:', response)
        return response
      })
      .catch(function (error) {
        console.log('error:', error)
        return error
      })
  }
}

export default userApi
