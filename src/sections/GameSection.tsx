import { useEffect } from 'react';
import { useGlobalContext } from '@/context/useGlobalContext';
import LandingLayout from '@/layout/LandingLayout';
import { requestAccounts } from '@/utils/contract';
import { Button } from '@/components/MovingBorder';
import useViewNavigate from '@/hooks/useNavigate';

const GameSection = () => {
    const { account, setAccount } = useGlobalContext();
    const navigate = useViewNavigate();

    const connectWallet = async () => {
        try {
            const accounts = await requestAccounts();
            setAccount(accounts[0]);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    };

    useEffect(() => {
        if (account) {
            navigate("/dashboard")
        }
    }, [account, navigate])

    return (
        <LandingLayout>
            <div style={{ minHeight: `calc(100vh - 270px)` }} className="flex flex-col items-center">
                <p className='text-3xl text-center mt-24 mb-10'>Connect Your Wallet</p>
                <Button onClick={connectWallet}>Metamask Wallet</Button>
                <p className='px-4 my-4 max-w-md text-center'>NOTE: We do not own your private keys & cannot access your funds without your confirmation</p>
            </div>
        </LandingLayout>
    );
};

export default GameSection;
