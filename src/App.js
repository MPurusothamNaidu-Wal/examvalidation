import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import RegisterApp from './Register';
import ValidateApp from './Validate';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to='/folder' className='col-lg-3 btn btn-secondary'>
          Register
        </Link>
        <Link to='/filedel' className='col-lg-3 btn btn-primary'>
          Login
        </Link>
        <Routes>
          <Route path='/folder' element={<RegisterApp />} />
          <Route path='/filedel' element={<ValidateApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
