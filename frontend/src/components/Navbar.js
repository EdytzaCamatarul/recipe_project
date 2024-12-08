import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/small logo.png';
import { Button } from './Button.js';
import './Navbar.css';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handle menu clicks
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Check login state
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem('token'); // Remove expired token
                    localStorage.removeItem('email');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Invalid token:', error);
                setIsLoggedIn(false);
            }
        }
    }, []);

    // Show/hide button on screen resize
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
        return () => window.removeEventListener('resize', showButton); // Cleanup
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/recipes' className='nav-links' onClick={closeMobileMenu}>
                                Recipes
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/add-recipe' className='nav-links' onClick={closeMobileMenu}>
                                Add Recipe
                            </Link>
                        </li>

                        {isLoggedIn ? (
                            location.pathname === '/profile' ? (
                                <li className='nav-item'>
                                    <Link to='/' className='nav-links-mobile' onClick={() => {
                                        handleLogout();
                                        closeMobileMenu();
                                    }}>
                                        Logout
                                    </Link>
                                </li>) : (
                                <li className='nav-item'>
                                    <Link to='/profile' className='nav-links-mobile' onClick={closeMobileMenu}>
                                        Profile
                                    </Link>
                                </li>
                            )
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                                        Login
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!isLoggedIn && button && (
                        <div>
                            <Button buttonStyle='btn--outline' link='/login'>
                                Login
                            </Button>

                            <Button buttonStyle='btn--medium' link='/register'>
                                Register
                            </Button>
                        </div>)}
                    {isLoggedIn && location.pathname === '/profile' && button && (
                        <Button buttonStyle='btn--outline' link='/' onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                        }}>
                            Logout
                        </Button>
                    )}
                    {isLoggedIn && button && location.pathname != '/profile' && (
                        <Button buttonStyle='btn--outline' link='/profile'>
                            Profile
                        </Button>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
