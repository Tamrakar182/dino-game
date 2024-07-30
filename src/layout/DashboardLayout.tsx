import Footer from "@/components/Footer";
import { useGlobalContext } from "@/context/useGlobalContext";
import useViewNavigate from "@/hooks/useNavigate";
import { useEffect, useState } from "react";
import useCustomNavigate from '@/hooks/useNavigate';
import Logo from "@/components/Logo";
import LoadingScreen from "@/components/LoadingScreen";

const NavBar = () => {
    const navigate = useCustomNavigate();
    const { account, handleLogOut } = useGlobalContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSignOutClick = () => {
        handleLogOut();
        setDropdownOpen(false);
        navigate('/');
    };

    return (
        <nav className="sticky w-full z-20 top-0 start-0 text-white">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <button onClick={() => navigate('/')}>
                    <Logo className="w-20 h-20" />
                </button>
                {account && (
                    <div className="relative">
                        <button
                            id="dropdownInformationButton"
                            onClick={handleDropdownToggle}
                            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            My Account
                            <svg
                                className={`w-2.5 h-2.5 ml-3 transition-transform transform ${dropdownOpen ? 'rotate-180' : ''
                                    }`}
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div
                                id="dropdownInformation"
                                className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow mt-2 w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>Wallet Address</div>
                                    <div className="font-medium truncate">
                                        {account}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <button
                                        onClick={() =>
                                            handleSignOutClick()
                                        }
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { account, isLoading } = useGlobalContext();
    const navigate = useViewNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (!account) {
                navigate('/');
            }
        }
    }, [account, navigate, isLoading]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <NavBar />
            <div className='content-container'>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default DashboardLayout;