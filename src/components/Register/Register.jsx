import { useState } from 'react';
import './/Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../../services/userService';

export default function Register() {
    let history = useNavigate();
    const [dataForm, setDataForm] = useState({
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const defaultValidForm = {
        validFormEmail: true,
        validFormPassword: true,
        validFormConfirmPassword: true,
    };
    const [validForm, setValidForm] = useState(defaultValidForm);
    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };
    const isValidForm = () => {
        if (!dataForm.email) {
            toast.error('Email is required');
            setValidForm({ ...validForm, validFormEmail: false });
        }
        if (!dataForm.password) {
            toast.error('Password is required');
            setValidForm({ ...validForm, validFormPassword: false });
        }
        if (!dataForm.confirmPassword) {
            toast.error('ConfirmPassword is required');
            setValidForm({ ...validForm, validFormConfirmPassword: false });
        }
        const regexEmail = /\S+@\S+\.\S+/;
        if (!regexEmail.test(dataForm.email)) {
            setValidForm({ ...validForm, validFormEmail: false });
            toast.error('Please enter a vaild email address');
        }
    };
    const submitForm = async () => {
        isValidForm();
        let responseData = await userApi.registerUser(dataForm);
        if (+responseData.data.EC === 0) {
            toast.success(responseData.data.EM);
            console.log('responseData', responseData);
            history('/login');
        } else {
            console.log('responseData-111', responseData);
            toast.error(responseData.data.EM);
        }
    };
    const goToLogin = () => {
        history('/login');
    };
    return (
        <section className='text-center text-lg-start'>
            {/* Jumbotron */}
            <div className='container py-4'>
                <div className='row g-0 align-items-center'>
                    <div className='col-lg-6 mb-5 mb-lg-0'>
                        <div
                            className='card cascading-right'
                            style={{
                                background: 'hsla(0, 0%, 100%, 0.55)',
                                backdropFilter: 'blur(30px)',
                            }}
                        >
                            <div className='card-body p-5 shadow-5 text-center'>
                                <h2 className='fw-bold mb-5'>Sign up now</h2>
                                <form>
                                    {/* Email input */}
                                    <div className='form-outline mb-4 '>
                                        <input
                                            onChange={handleOnchange}
                                            name='email'
                                            type='email'
                                            id='form3Example3'
                                            className={`${
                                                validForm.validFormEmail ||
                                                'is-invalid'
                                            } form-control`}
                                        />
                                        <label
                                            className='form-label'
                                            htmlFor='form3Example3'
                                        >
                                            Email address
                                        </label>
                                    </div>
                                    {/* Password input */}
                                    <div className='form-outline mb-4'>
                                        <input
                                            onChange={handleOnchange}
                                            name='password'
                                            type='password'
                                            id='form3Example4'
                                            className={`${
                                                validForm.validFormPassword ||
                                                'is-invalid'
                                            } form-control`}
                                        />
                                        <label
                                            className='form-label'
                                            htmlFor='form3Example4'
                                        >
                                            Password
                                        </label>
                                    </div>

                                    {/*Confirm Password input */}
                                    <div className='form-outline mb-4'>
                                        <input
                                            onChange={handleOnchange}
                                            name='confirmPassword'
                                            type='password'
                                            id='form3Example4'
                                            className={`${
                                                validForm.validFormConfirmPassword ||
                                                'is-invalid'
                                            } form-control`}
                                        />
                                        <label
                                            className='form-label'
                                            htmlFor='form3Example4'
                                        >
                                            Confirm password
                                        </label>
                                    </div>
                                    {/* userName and numbe phone */}
                                    <div className='row'>
                                        <div className='col-md-6 mb-4'>
                                            <div className='form-outline'>
                                                <input
                                                    onChange={handleOnchange}
                                                    name='username'
                                                    type='text'
                                                    id='form3Example1'
                                                    className='form-control'
                                                />
                                                <label
                                                    className='form-label'
                                                    htmlFor='form3Example1'
                                                >
                                                    User Name
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-md-6 mb-4'>
                                            <div className='form-outline'>
                                                <input
                                                    onChange={handleOnchange}
                                                    name='phone'
                                                    type='text'
                                                    id='form3Example2'
                                                    className='form-control'
                                                />
                                                <label
                                                    className='form-label'
                                                    htmlFor='form3Example2'
                                                >
                                                    Number Phone
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkbox */}
                                    <div className='form-check d-flex justify-content-center mb-4'>
                                        <input
                                            className='form-check-input me-2'
                                            type='checkbox'
                                            defaultValue
                                            id='form2Example33'
                                            defaultChecked
                                        />
                                        <label
                                            className='form-check-label'
                                            htmlFor='form2Example33'
                                        >
                                            Subscribe to our newsletter
                                        </label>
                                    </div>
                                    {/* Submit button */}
                                    <button
                                        type='button'
                                        className='btn btn-primary btn-block mb-4'
                                        onClick={submitForm}
                                    >
                                        Sign up
                                    </button>
                                    <p className='small fw-bold mt-2 pt-1 mb-0'>
                                        {`Back to login page`}
                                        <a
                                            href='#!'
                                            className='link-danger'
                                            onClick={goToLogin}
                                        >
                                            Login
                                        </a>
                                    </p>
                                    {/* Register buttons */}
                                    <div className='text-center'>
                                        <p>or sign up with:</p>
                                        <button
                                            type='button'
                                            className='btn btn-link btn-floating mx-1'
                                        >
                                            <i className='fab fa-facebook-f' />
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-link btn-floating mx-1'
                                        >
                                            <i className='fab fa-google' />
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-link btn-floating mx-1'
                                        >
                                            <i className='fab fa-twitter' />
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-link btn-floating mx-1'
                                        >
                                            <i className='fab fa-github' />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 mb-5 mb-lg-0'>
                        <img
                            src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg'
                            className='w-100 rounded-4 shadow-4'
                            alt
                        />
                    </div>
                </div>
            </div>
            {/* Jumbotron */}
        </section>
    );
}
