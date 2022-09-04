import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../common/form/textField';
import SectionWrapper from '../common/style/sectionWrapper';
import style from './loginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginError, login } from '../../store/users';

const LoginForm = ({ onTypeChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(null);
  const loginError = useSelector(getLoginError());
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('data', data);
    const redirect = navigate('/stats');
    dispatch(login({ payload: data, redirect }));
  };

  const typeChangeRegister = () => {
    onTypeChange('register');
  };

  return (
    <SectionWrapper>
      <div className={style.wrapper}>
        <div className={style.wrapper_in}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.title_wrapper}>
              <h3 className={style.title}>Log in</h3>
            </div>
            <div className='fields'>
              <TextField
                label='Username'
                name='username'
                type='text'
                value={data.username}
                onFormChange={handleChange}
              />
              <TextField
                label='Password'
                name='password'
                type='password'
                value={data.password}
                onFormChange={handleChange}
              />
            </div>
            <div className={style.options}>
              <button className={style.enter_button}>Log in</button>
              <p onClick={typeChangeRegister} className={style.register_button}>Don't have an account? <span className={style.register_button_style}>Sign in</span></p>
            </div>
          </form>
          {
            isError &&
            <p>{isError}</p>
          }
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LoginForm;