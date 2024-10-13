//import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import {  useSelector } from 'react-redux';
import NavLinks from './NavLinks';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
 
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
            {/* <Logo /> */}
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
