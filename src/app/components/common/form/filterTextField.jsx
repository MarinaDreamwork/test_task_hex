import style from '../../ui/filter.module.css';

const FilteredTextField = ({ placeholder, value, name, onTargetFilter }) => {
  return (
    <input
      className={style.input_filter + ' ' + style.input_short}
      type='text'
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onTargetFilter}
    />
  );
};

export default FilteredTextField;