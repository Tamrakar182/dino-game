import Logo from './Logo';
import useCustomNavigate from '@/hooks/useNavigate';
import { useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import clsx from 'clsx';

const NavBar = () => {
    const navigate = useCustomNavigate();
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="sticky w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <button onClick={() => {
                    navigate('/');
                }}>
                    <Logo className="w-20 h-20" />
                </button>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div
                    className={clsx("items-center justify-between mt-4 w-full md:flex md:w-auto md:order-1", {
                        'block bg-[#192336]': isMenuOpen,
                        'hidden': !isMenuOpen
                    })}>
                    <ul className="flex flex-col p-4 md:p-0 pt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                            <button
                                onClick={() => navigate('/home')}
                                className={clsx("hover:text-gray-400 transition-colors duration-200 block py-2 px-3 rounded md:p-0", {
                                    "text-sky-600": location.pathname === "/home",
                                    "text-white": location.pathname !== "/home"
                                })}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/about')}
                                className={clsx("hover:text-gray-400 transition-colors duration-200 block py-2 px-3 rounded md:p-0", {
                                    "text-sky-600": location.pathname === "/about",
                                    "text-white": location.pathname !== "/about"
                                })}>
                                About
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/game')}
                                className={clsx("hover:text-gray-400 transition-colors duration-200 block py-2 px-3 rounded md:p-0", {
                                    "text-sky-600": location.pathname === "/game",
                                    "text-white": location.pathname !== "/game"
                                })}
                            >
                                Game
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;