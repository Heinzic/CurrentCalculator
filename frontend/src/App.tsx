import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main' element={<Main />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App