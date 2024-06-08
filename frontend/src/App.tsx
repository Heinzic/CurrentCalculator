import { Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import PrivateRoutes from './store/utils/PrivateRoutes';
import CreateCalculation from './components/pages/CreateCalculation';
import {LoginGuard} from './store/hocs/LoginGuard';
import Calculation from './components/pages/Calculation';

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginGuard/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Main />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/createCalculation' element={<CreateCalculation/>} />
            <Route path='/calculation/:id' element={<Calculation/>} />
          </Route>
        </Route>
      </Routes>
    
    </>
  )
}

export default App