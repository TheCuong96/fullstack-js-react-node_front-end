import { useEffect, useState } from 'react';
import userApi from '../../services/userService';

export default function User() {
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        let response = await userApi.fetchAllUser();
        console.log('response', response);
        if (response && response.data && +response.data.EC === 0) {
            setListUsers(response.data.DT);
        }
    };
    return (
        <div>
            <div className='container'>
                <h1>List user</h1>
                <div className='panel panel-success border border-bottom-0 mt-5'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th
                                    style={{ width: '10%' }}
                                    className='text-center'
                                >
                                    #
                                </th>
                                <th>Email</th>
                                <th
                                    style={{ width: '15%' }}
                                    className='text-center'
                                >
                                    phone
                                </th>
                                <th
                                    style={{ width: '15%' }}
                                    className='text-center'
                                >
                                    Username
                                </th>
                                <th
                                    style={{ width: '15%' }}
                                    className='text-center'
                                >
                                    Group
                                </th>
                                <th
                                    style={{ width: '15%' }}
                                    className='text-center'
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>id</td>
                                        <td>{item.email}</td>
                                        <td className='text-center'>
                                            <span className='label label-danger'>
                                                {item.phone}
                                            </span>
                                        </td>
                                        <td className='text-center'>
                                            <span className='label label-danger'>
                                                {item.username}
                                            </span>
                                        </td>
                                        <td className='text-center'>
                                            <span className='label label-danger'>
                                                {item.Group}
                                            </span>
                                        </td>
                                        <td className='d-flex align-items-center justify-content-evenly'>
                                            <form
                                                action='/edit-user/<%= item.id %>'
                                                method='GET'
                                            >
                                                <button
                                                    type='submit'
                                                    className='btn btn-warning btn-sm'
                                                >
                                                    Edit
                                                </button>
                                            </form>
                                            <form
                                                action='/delete-user'
                                                method='POST'
                                            >
                                                <input
                                                    type='text'
                                                    hidden
                                                    defaultValue='<%= item.id %>'
                                                    name='userId'
                                                />
                                                <button
                                                    type='submit'
                                                    className='btn btn-danger btn-sm'
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            ;
        </div>
    );
}
