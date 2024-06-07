import { MovingCards } from '@/components/MovingCards'
import { HeroLogo } from '@/components/HeroLogo'
import LandingLayout from '@/layout/LandingLayout'

const items = [
    {
        image: "/characters/adventurer.png",
        name: "Adventurer"
    },
    {
        image: "/characters/angel.png",
        name: "Angel"
    },
    {
        image: "/characters/angryMan.png",
        name: "Angry Man"
    },
    {
        image: "/characters/constructionWorker.png",
        name: "Construction Worker"
    },
    {
        image: "/characters/diver.png",
        name: "Diver"
    },
    {
        image: "/characters/evilGuy.png",
        name: "Evil Guy"
    },
    {
        image: "/characters/extraOrdinaryMan.png",
        name: "Extraordinary Man"
    },
    {
        image: "/characters/warrior.png",
        name: "Warrior"
    },
    {
        image: "/characters/wizard.png",
        name: "Wizard"
    },
]

export default function HomeSection() {
    return (
        <LandingLayout>
            <HeroLogo />
            <div className="py-4">
                <h3 className="text-center text-sm md:text-lg">💲💲 Bet on a Cast of Colorful characters in Simulated Battles and Win Moneyyy 💸💸</h3>
                <MovingCards items={items} speed='slow' pauseOnHover={false} />
            </div>
        </LandingLayout>
    )
}
