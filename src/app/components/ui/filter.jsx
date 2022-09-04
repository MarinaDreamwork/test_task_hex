import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllStat } from '../../store/statistics';
import FilteredTextField from '../common/form/filterTextField';
import style from './filter.module.css';

const Filter = ({ onFilter, currentStatInfo }) => {
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
      <FilteredTextField
        placeholder='filter by short'
        value={data.short}
        name='short'
        onTargetFilter={handleTargetFilter}
        style={style.input_short}
      />
      <FilteredTextField
        placeholder='filter by target'
        value={data.target}
        name='target'
        onTargetFilter={handleTargetFilter}
        style={style.input_target}
      />
      <FilteredTextField
        placeholder='filter by counter'
        value={data.counter}
        name='counter'
        onTargetFilter={handleTargetFilter}
        style={style.input_counter}
      />
    </div>);
};

export default Filter;