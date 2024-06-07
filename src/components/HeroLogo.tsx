import { Button } from "./MovingBorder";
import useViewNavigate from "@/hooks/useNavigate";

export function HeroLogo() {
    const navigate = useViewNavigate();

    return (
        <div className="h-[50rem] w-full bg-[#13171C] bg-dot-white/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#13171C] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex flex-col gap-6 items-center justify-center">
                <p className="text-4xl sm:text-7xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                    Dino Game<span className="text-black">🐲</span>
                </p>

                <Button onClick={() => navigate('/game')}>Enter The Game</Button>
            </div>
        </div>
    );
}
