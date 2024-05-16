import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import { useEffect } from 'react';
import { tokenService } from './store/services/TokenService';
import { useLoadMyProfileQuery } from './store/apis/UserAPI';
import { useRefreshTokenMutation } from './store/apis/AuthAPI';
import PrivateRoutes from './store/utils/PrivateRoutes';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoutes/>}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/' element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App