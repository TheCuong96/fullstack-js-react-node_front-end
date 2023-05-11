import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import User from './components/User/User';
import AuthenticatedGuards from './guards/AuthenticatedGuards';
function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route
                    path='/user'
                    element={
                        <AuthenticatedGuards>
                            <User />
                        </AuthenticatedGuards>
                    }
                />

                <Route path='/news' element={'news'} />
                <Route path='/about' element={'about'} />
                <Route path='/contact' element={'Contact'} />
                <Route path='/user' element={<User />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={'home'} exact />
                <Route path='*' element={'404 not found'} />
            </Routes>
            <ToastContainer
                position='bottom-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
