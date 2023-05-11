import { useEffect, useState } from 'react';
import userApi from '../../services/userService';
import ReactPaginate from 'react-paginate';
export default function User() {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLitmit, setCurrentLitmit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchUser();
    }, [currentPage]);
    const fetchUser = async () => {
        let response = await userApi.fetchAllUser(currentPage, currentLitmit);
        console.log('response', response);
        if (response && response.data && +response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.user);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
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
                                        <td className='text-center'>
                                            {item.id}
                                        </td>
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
                <div>
                    {totalPages > 0 && (
                        <div className='user-footer'>
                            <ReactPaginate
                                breakLabel='...'
                                nextLabel='next >'
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={4}
                                pageCount={totalPages}
                                previousLabel='< previous'
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousClassName='page-item'
                                previousLinkClassName='page-link'
                                nextClassName='page-item'
                                nextLinkClassName='page-link'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                containerClassName='pagination'
                                activeClassName='active'
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    )}
                </div>
            </div>
            ;
        </div>
    );
}
