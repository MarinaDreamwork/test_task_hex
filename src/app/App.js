import NavBar from './components/ui/navBar';
import { Routes, Route } from 'react-router-dom';
import Form from './layouts/form';
import StatisticInformation from './layouts/statisticInformation';
import Squeeze from './layouts/squeeze';

const App = () => {

  return (
    <div className='m-2'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Squeeze />}/>
        <Route path='stats' element={<StatisticInformation />}/>
        <Route path='login' element={<Form />}/>
      </Routes>
    </div>
  );
};

export default App;
