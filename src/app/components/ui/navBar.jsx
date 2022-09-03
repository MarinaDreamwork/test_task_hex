import { Link } from 'react-router-dom';
import { getIsLoggedIn } from '../../store/users';
import style from './navBar.module.css';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <header>
      <nav className={style.nav}>
        <ul className={style.nav_list}>
          <li className={style.nav_list_item}>
            <Link to='/login' className={style.nav_list_item_link}>Register/Login</Link>
          </li>
          {
            isLoggedIn && (
              <>
                <li className={style.nav_list_item}>
                  <Link to='/stats' className={style.nav_list_item_link}>Statistic Information</Link>
                </li>
                <li className={style.nav_list_item}>
                  <Link to='/' className={style.nav_list_item_link}>Shortening Links</Link>
                </li>
              </>
            )
          }
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;