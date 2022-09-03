import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../components/common/form/textField';
import SectionWrapper from '../components/common/style/sectionWrapper';
import style from './squeeze.module.css';
import { getIsLoggedIn, getUsername } from '../store/users';
import localStorageService from '../services/localStorage.service';
import { getShortLink } from '../store/links';

const Squeeze = () => {
  const dispatch = useDispatch();
  const isLoggedIn = localStorageService.getAccessToken();
  const username = useSelector(getUsername());
  const navigate = useNavigate();
  const [data, setData] = useState({
    link: ''
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
    //  отправляем на бэк
    dispatch(getShortLink(data));
    navigate('stats');
  };

  if (!isLoggedIn) return 'Loading...'
  return (
    <SectionWrapper>
      {
        isLoggedIn && (
          <div className={style.greet_title_wrapper}>
            <h2 className={style.greet_title}>Здравствуйте, {username}</h2>
          </div>
        )
      }
      <h2 className={style.squeeze_title}>Введите URL для сжатия:</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label
          type='text'
          name='link'
          value={data.link}
          onFormChange={handleChange}
        />
        <div className={style.button_squeeze_wrapper}>
          <button className={style.link_button}>Sent uri for receiving squeeze one</button>
        </div>
      </form>
    </SectionWrapper>
  );
};

export default Squeeze;