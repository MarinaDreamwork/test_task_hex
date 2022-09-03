import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../components/common/form/textField';
import SectionWrapper from '../components/common/style/sectionWrapper';
import style from './squeeze.module.css';
import { getIsLoggedIn, getUsername } from '../store/users';
import { getShortLink } from '../store/links';

const Squeeze = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
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
    dispatch(getShortLink(data));
    navigate('stats');
  };

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

