import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

const Header = () => {
    return (
        <header className='topbar'>
            <div className='container'>
                <div className='logo'>online store</div>
                <nav className='navbar'>
                    <NavLink to='/' exact>home</NavLink>
                    <NavLink to='/phones'>phones</NavLink>
                    <NavLink to='/basket'>basket</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;