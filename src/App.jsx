import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path='/news' element={'news'} />
                <Route path='/about' element={'about'} />
                <Route path='/contact' element={'Contact'} />
                <Route path='/login' element={Login} />
                <Route path='/' element={'home'} exact />
                <Route path='*' element={'404 not found'} />
            </Routes>
        </>
    );
}

export default App;
