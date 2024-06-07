import Logo from "@/components/Logo";
import { useEffect } from 'react';
import useCustomNavigate from '@/hooks/useNavigate';

function IntroSection() {
    const navigate = useCustomNavigate();

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            navigate('/home');
        }, 2000);
    
        return () => {
            clearTimeout(timeoutId);
        };
    }, [navigate])


    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <Logo className="w-52 h-52"/>
            <h1 className="text-4xl">Dino Game</h1>
        </div >
    );
}

export default IntroSection;