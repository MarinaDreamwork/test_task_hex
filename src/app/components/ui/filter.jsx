import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllStat } from '../../store/statistics';
import style from './filter.module.css';

const Filter = ({ onFilter, currentStatInfo, onSet }) => {
  const allData = useSelector(getAllStat());
  const [data, setData] = useState({
    short: '',
    target: '',
    counter: ''
  });
  const filterData = (array) => {
    const filteredStatData = data.short || data.target || data.counter
      ? array.filter(item => item.target.toLowerCase().includes(data.target) && item.short.includes(data.short) && item.counter.toString().includes(data.counter.toString()))
      : currentStatInfo;
    return filteredStatData;
  }

  const filteredData = filterData(allData);

  const handleTargetFilter = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));

    console.log('data', data);
  };

  useEffect(() => {
    if (data.target || data.short || data.counter) {
      onFilter(filteredData);
    } else {
      onFilter(null);
    }
  }, [data]);

  return (
    <div className={style.filter_wrapper}>
      <input
        className={style.input_filter + ' ' + style.input_short} type='text'
        placeholder='filter by short'
        value={data.short}
        name='short'
        onChange={handleTargetFilter}
      />
      <input
        className={style.input_filter + ' ' + style.input_target} type='text'
        placeholder='filter by target'
        value={data.target}
        name='target'
        onChange={handleTargetFilter}
      />
      <input
        className={style.input_filter + ' ' + style.input_counter} type='text'
        placeholder='filter by counter'
        value={data.counter}
        name='counter'
        onChange={handleTargetFilter}
      />
    </div>);
};

export default Filter;