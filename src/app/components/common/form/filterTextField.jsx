const FilteredTextField = ({
  placeholder,
  value,
  name,
  onTargetFilter,
  style
}) => {
  return (
    <input
      className={style}
      type='text'
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onTargetFilter}
    />
  );
};

export default FilteredTextField;