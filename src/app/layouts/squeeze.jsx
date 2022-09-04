import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../components/common/form/textField';
import SectionWrapper from '../components/common/style/sectionWrapper';
import style from './squeeze.module.css';
import { getIsLoggedIn, getLoginError, getUsername } from '../store/users';
import { getCreatedLink, getShortLink } from '../store/links';

const Squeeze = () => {
  const [isLogged, setLogged] = useState(null);
  const [createdLink, setCreatedLink] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  const dispatch = useDispatch();
  const username = useSelector(getUsername());
  const newLink = useSelector(getCreatedLink());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const loginError = useSelector(getLoginError());

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
    setData({ link: '' });
    setCreatedLink(newLink);
  };

  useEffect(() => {
    setCreatedLink(newLink);
  }, [newLink]);

  useEffect(() => {
    setLogged(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    setNetworkError(loginError)
  }, [loginError]);

  return (
    <SectionWrapper>
      {
        !networkError ? (
          isLogged ? (
            <>
              <div className={style.greet_title_wrapper}>
                <h2 className={style.greet_title}>Здравствуйте, {username}</h2>
              </div>
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
              {
                createdLink && (
                  <div className={style.link_info_wrapper}>
                    <p className={style.link_info}>Short link was successfuly created {createdLink?.short}</p>
                  </div>
                )
              }
            </>
          ) : (
            <div className={style.login_error_title}>
              <h3>Пожалуйста, войдите в систему или зарегистрируйтесь</h3>
            </div>
          )
        ) : (
          <div className={style.login_error_title}>
            <h3>{loginError}</h3>
          </div>
        )
      }
    </SectionWrapper>
  );
};

export default Squeeze;

