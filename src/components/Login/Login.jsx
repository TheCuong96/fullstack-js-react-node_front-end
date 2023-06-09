import { useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../../services/userService';
const Login = () => {
    let history = useNavigate();

    useEffect(() => {
        let account = JSON.parse(sessionStorage.getItem('account'));
        if (account) {
            history('/');
        }
    }, []);

    const [valueAccount, setValueAccount] = useState({
        emailOrPhone: '',
        password: '',
    });
    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setValueAccount({ ...valueAccount, [name]: value });
    };
    const defaultValidForm = {
        validAccountEmailOrPhone: true,
        validAccountPassword: true,
    };
    const [validAccount, setValidAccount] = useState(defaultValidForm);
    const submitLogin = async () => {
        setValidAccount(defaultValidForm);
        if (!valueAccount.emailOrPhone) {
            toast.error('Please enter your email address or phone number');
            setValidAccount({
                ...validAccount,
                validAccountEmailOrPhone: false,
            });
            return;
        }
        if (!valueAccount.password) {
            toast.error('Please enter your Password');
            setValidAccount({ ...validAccount, validAccountPassword: false });
            return;
        }
        let response = await userApi.loginUser(valueAccount);
        if (response && response.data && +response.data.EC === 0) {
            const data = { isAuthenticated: true, token: 'fake token' };
            sessionStorage.setItem('account', JSON.stringify(data));
            history('/user');
        }
        if (response && response.data && +response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
    };
    const goToRegister = () => {
        history('/register');
    };
    return (
        <section className='vh-100'>
            <div className='container-fluid h-custom'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-md-9 col-lg-6 col-xl-5'>
                        <img
                            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                            className='img-fluid'
                            alt='Sample image'
                        />
                    </div>
                    <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
                        <form>
                            <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                                <p className='lead fw-normal mb-0 me-3'>
                                    Sign in with
                                </p>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-floating mx-1'
                                >
                                    <i className='fab fa-facebook-f' />
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-floating mx-1'
                                >
                                    <i className='fab fa-twitter' />
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-floating mx-1'
                                >
                                    <i className='fab fa-linkedin-in' />
                                </button>
                            </div>
                            <div className='divider d-flex align-items-center my-4'>
                                <p className='text-center fw-bold mx-3 mb-0'>
                                    Or
                                </p>
                            </div>
                            {/* Email input */}
                            <div className='form-outline mb-4'>
                                <input
                                    type='email'
                                    id='form3Example3'
                                    placeholder='Enter a valid email address or phone'
                                    name='emailOrPhone'
                                    onChange={handleOnchange}
                                    value={valueAccount.emailOrPhone}
                                    className={`${
                                        validAccount.validAccountEmailOrPhone ||
                                        'is-invalid'
                                    } form-control form-control-lg`}
                                />
                                <label
                                    className='form-label'
                                    htmlFor='form3Example3'
                                >
                                    Email or phone
                                </label>
                            </div>
                            {/* Password input */}
                            <div className='form-outline mb-3'>
                                <input
                                    type='password'
                                    id='form3Example4'
                                    placeholder='Enter password'
                                    name='password'
                                    onChange={handleOnchange}
                                    value={valueAccount.password}
                                    className={`${
                                        validAccount.validAccountPassword ||
                                        'is-invalid'
                                    } form-control form-control-lg`}
                                />
                                <label
                                    className='form-label'
                                    htmlFor='form3Example4'
                                >
                                    Password
                                </label>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                {/* Checkbox */}
                                <div className='form-check mb-0'>
                                    <input
                                        className='form-check-input me-2'
                                        type='checkbox'
                                        defaultValue
                                        id='form2Example3'
                                    />
                                    <label
                                        className='form-check-label'
                                        htmlFor='form2Example3'
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a href='#!' className='text-body'>
                                    Forgot password?
                                </a>
                            </div>
                            <div className='text-center text-lg-start mt-4 pt-2'>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-lg'
                                    style={{
                                        paddingLeft: '2.5rem',
                                        paddingRight: '2.5rem',
                                    }}
                                    onClick={submitLogin}
                                >
                                    Login
                                </button>
                                <p className='small fw-bold mt-2 pt-1 mb-0'>
                                    {`Don't have an account?`}
                                    <a
                                        href='#!'
                                        className='link-danger'
                                        onClick={goToRegister}
                                    >
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary'>
                {/* Copyright */}
                <div className='text-white mb-3 mb-md-0'>
                    Copyright © 2020. All rights reserved.
                </div>
                {/* Copyright */}
                {/* Right */}
                <div>
                    <a href='#!' className='text-white me-4'>
                        <i className='fab fa-facebook-f' />
                    </a>
                    <a href='#!' className='text-white me-4'>
                        <i className='fab fa-twitter' />
                    </a>
                    <a href='#!' className='text-white me-4'>
                        <i className='fab fa-google' />
                    </a>
                    <a href='#!' className='text-white'>
                        <i className='fab fa-linkedin-in' />
                    </a>
                </div>
                {/* Right */}
            </div>
        </section>
    );
};

export default Login;
