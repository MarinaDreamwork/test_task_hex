import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../common/form/textField';
import SectionWrapper from '../common/style/sectionWrapper';
import style from './loginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { register, getLoginError } from '../../store/users';

const RegisterForm = ({ onTypeChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isError = useSelector(getLoginError());

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
    dispatch(register({ payload: data, redirect }));
  };

  const typeChangeRegister = () => {
    onTypeChange('login');
  };

  return (
    <SectionWrapper>
      <div className={style.wrapper}>
        <div className={style.wrapper_in}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.title_wrapper}>
              <h3 className={style.title}>Sign in</h3>
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
              {isError && (
                <div className={style.error_wrapper}>
                  <p className={style.error}>{isError}</p>
                </div>
              )
              }
            </div>
            <div className={style.options}>
              <button className={style.enter_button}>Sign in</button>
              <p onClick={typeChangeRegister} className={style.register_button}>Have an account?<span className={style.register_button_style}> Log in</span></p>
            </div>
          </form>
        </div>
      </div >
    </SectionWrapper >
  );
};

export default RegisterForm;