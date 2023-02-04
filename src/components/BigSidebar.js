//import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/userSlice';
import NavLinks from './NavLinks';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? 'sidebar-container '
            : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
           <NavLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
