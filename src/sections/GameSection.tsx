import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/useGlobalContext';
import LandingLayout from '@/layout/LandingLayout';
import { Button } from '@/components/MovingBorder';
import useViewNavigate from '@/hooks/useNavigate';
import useDinoBattleGame from '@/hooks/useDinoGame';

const GameSection = () => {
    const { connectWallet, account, registered } = useGlobalContext();
    const navigate = useViewNavigate();
    const { registerPlayer } = useDinoBattleGame();
    const [isAcctLoading, setIsAcctLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        console.log(registered)
        if (registered) {
            navigate("/dashboard")
        }
    }, [registered, navigate])

    const handleConnect = async () => {
        setIsAcctLoading(true)
        try {
            await connectWallet();
        } finally {
            setIsAcctLoading(false)
        }
    };

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            await registerPlayer();
        } finally {
            setIsAcctLoading(false)
        }

    }
    return (
        <LandingLayout>
            <div style={{ minHeight: `calc(100vh - 270px)` }} className="flex flex-col items-center">
                <p className='text-3xl text-center mt-24 mb-10'>
                    Connect Your Wallet
                </p>
                <Button disabled={isAcctLoading} onClick={handleConnect}>
                    {isAcctLoading ? "Loading..." : "Metamask Wallet"}
                </Button>
                <p className='px-4 my-4 max-w-md text-center'>NOTE: We do not own your private keys & cannot access your funds without your confirmation</p>

                {account !== null && <p className='mb-4'>Connected Account: {account}</p>}

                <Button
                    className='px-4'
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Register your Account"}
                </Button>
            </div>
        </LandingLayout>
    );
};

export default GameSection;
