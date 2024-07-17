import DashboardLayout from '@/layout/DashboardLayout';
import { characters } from '@/constants';
import { Button } from '@/components/MovingBorder';
import Leaderboard from '@/components/Leaderboard';
import BettingModal from '@/components/BettingModal';
import { useState } from 'react';

const CharacterBet = ({ character }: { character: string }) => {
    const characterObject = characters.find(item => item.name === character);
    const [open, setOpen] = useState(false)

    if (!characterObject) return <div>Not Found!!</div>;

    const handleOpen = (value: boolean) => {
        setOpen(value)
    }

    return (
        <div className='flex-col flex gap-4 items-center'>
            <BettingModal character={character} open={open} handleOpen={handleOpen} />
            <img src={characterObject.image} className="w-[250px] md:w-[350px]" alt={character} />
            <Button onClick={() => setOpen(true)}>Place Bet</Button>
            <div>Odds: 1x Times</div>
        </div>
    );
};

const DashboardSection = () => {
    return (
        <DashboardLayout>
            <div style={{ minHeight: `calc(100vh - 270px)` }} className="flex flex-col items-center">
                <div className='text-center text-5xl'>Game Ongoing...</div>
                <div className="grid grid-cols-3 gap-8 w-full max-w-screen-xl mt-8">
                    <div className='flex flex-row col-span-2'>
                        <CharacterBet character='Adventurer' />
                        <div className="flex items-center text-5xl mx-8">VS</div>
                        <CharacterBet character='Angel' />
                    </div>
                    <div className="col-span-1">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardSection;
