import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import PrivateRoutes from './store/utils/PrivateRoutes';
import CreateCalculation from './components/pages/CreateCalculation';
import { useEffect } from 'react';
import { useLoadMyProfileQuery } from './store/apis/UserAPI';
import { tokenService } from './store/services/TokenService';
import { RootState } from './store/store';
import { connect } from 'react-redux';
import CreateObject from './components/pages/CreateObject';

interface AppProps {
  isAuth: boolean
}

function App({isAuth}: AppProps) {

  const navigate = useNavigate()
    useEffect(() => {
        loadProfile()
        if (isAuth) navigate('/')
    },[])

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<Main />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/createCalculation' element={<CreateCalculation/>} />
          <Route path='/createObject' element={<CreateObject/>} />
        </Route>
      </Routes>
    </>
  )
}

async function loadProfile() {
  const access = tokenService.getLocalAccessToken()
  console.log(access)
  if(access)
      await useLoadMyProfileQuery(access)
}

function mapStateToProps(state: RootState){
  return {
      isAuth: state.authReducer.isAuth,
  }
}

export default connect(mapStateToProps)(App)