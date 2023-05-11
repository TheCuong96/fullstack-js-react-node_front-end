import { useEffect, useState } from 'react';
import userApi from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalUser from '../ModalUser/ModalUser';
export default function User() {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLitmit, setCurrentLitmit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [showModalUser, setShowModalUser] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [currentPage]);
    const fetchUser = async () => {
        console.log('currentPage', currentPage);
        console.log('currentLitmit', currentLitmit);
        let response = await userApi.fetchAllUser(currentPage, currentLitmit);
        if (response && response.data && +response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.user);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    };
    const handleClosePopup = (user) => {
        setDataModal({});
        setIsShowModalDelete(false);
    };
    const confirmDeleteUser = async () => {
        let response = await userApi.deleteUser(dataModal);
        console.log('redataModalsponse', dataModal);
        if (response && +response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchUser();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
        }
    };
    const onHideModalUser = () => {
        setShowModalUser(false);
    };
    console.log('listUsers', listUsers);
    return (
        <div>
            <div className='container'>
                <h1>List user</h1>
                <button onClick={() => setShowModalUser(true)}>add user</button>
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
                            {listUsers &&
                                listUsers.map((item, index) => {
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
                                                    {item?.Group?.name}
                                                </span>
                                            </td>
                                            <td className='d-flex align-items-center justify-content-evenly'>
                                                <button
                                                    type='submit'
                                                    className='btn btn-warning btn-sm'
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className='btn btn-danger btn-sm'
                                                    onClick={() =>
                                                        handleDeleteUser(item)
                                                    }
                                                >
                                                    Delete
                                                </button>
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
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClosePopup}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser onHide={onHideModalUser} show={showModalUser} />
        </div>
    );
}
