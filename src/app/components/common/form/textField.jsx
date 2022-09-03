import style from './textField.module.css';

const TextField = ({ label, type, name, value, onFormChange }) => {
  return (
    <div className={style.wrapper} >
      <label
        htmlFor={name}
        className={style.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onFormChange}
        className={style.input_field}
      />
    </div>
  );
};

export default TextField;