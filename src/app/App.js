import './App.css';
import NavBar from './components/ui/navBar';
import { Routes, Route } from 'react-router-dom';
import Form from './layouts/form';
import StatisticInformation from './layouts/statisticInformation';
import Squeeze from './layouts/squeeze';
import { useEffect } from 'react';
import { loadAllStatisticInformation } from './store/statistics';
import { useDispatch } from 'react-redux';

const App = () => {

  //const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadAllStatisticInformation());
  // }, []);

  return (
    <div className='m-2'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Squeeze />}/>
        <Route path='/stats' element={<StatisticInformation />}/>
        <Route path='/login' element={<Form />}/>
      </Routes>
    </div>
  );
};

export default App;
