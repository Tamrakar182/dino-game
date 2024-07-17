import { MovingCards } from '@/components/MovingCards'
import { HeroLogo } from '@/components/HeroLogo'
import LandingLayout from '@/layout/LandingLayout'
import { characters } from "@/constants"

export default function HomeSection() {
    return (
        <LandingLayout>
            <HeroLogo />
            <div className="py-4">
                <h3 className="text-center text-sm md:text-lg">💲💲 Bet on a Cast of Colorful characters in Simulated Battles and Win Moneyyy 💸💸</h3>
                <MovingCards items={characters} speed='slow' pauseOnHover={false} />
            </div>
        </LandingLayout>
    )
}
