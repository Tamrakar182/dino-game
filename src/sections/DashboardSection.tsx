import { useState, useEffect, useCallback } from 'react';
import { characters } from '@/constants';
import DashboardLayout from '@/layout/DashboardLayout';

import { Button } from '@/components/MovingBorder';
import BettingModal from '@/components/BettingModal';

import CharacterSelection from '@/components/CharacterSelection';
import { useGlobalContext } from '@/context/useGlobalContext';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import useDinoBattleGame from '@/hooks/useDinoGame';

import YouLostModal from '@/components/YouLostModal';
import YouWonModal from '@/components/YouWonModal';

const CharacterBet = ({ character }: { character: string }) => {
    const { betAmount } = useGlobalContext();
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
            <p>{characterObject.name}</p>
            {betAmount ?
                (
                    <div className='flex flex-row gap-2'>
                        <p>Placed Bet: {betAmount}</p>
                        <ArrowPathIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                )
                : <Button onClick={() => setOpen(true)}>Place Bet</Button>
            }
        </div>
    );
};

const OpponentCharacter = ({ character }: { character: string }) => {
    const characterObject = characters.find(item => item.name === character);

    if (!characterObject) return <div>Not Found!!</div>;

    return (
        <div className='flex-col flex gap-4 items-center'>
            <img src={characterObject.image} className="w-[250px] md:w-[350px]" alt={character} />
            <p>{characterObject.name}</p>
        </div>
    );
};


const DashboardSection = () => {
    const [opponentCharacter, setOpponentCharacter] = useState<string | null>(null);
    const { userCharacter, betAmount, handleCharacterSelect } = useGlobalContext();
    const { playGame, winner } = useDinoBattleGame();

    const [isLoading, setIsLoading] = useState(false);
    const [wonModal, setWonModal] = useState(false);
    const [lostModal, setLostModal] = useState(false);

    const selectRandomOpponent = useCallback(() => {
        const availableCharacters = characters.filter(c => c.name !== userCharacter);
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        setOpponentCharacter(availableCharacters[randomIndex].name);
    }, [userCharacter]);

    useEffect(() => {
        if (userCharacter) {
            selectRandomOpponent();
        }
    }, [selectRandomOpponent, userCharacter]);

    useEffect(() => {
        if (winner !== null && userCharacter !== null) {
            if (winner === userCharacter) {
                setWonModal(true);
            } else {
                setLostModal(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winner])

    const handleWon = (value: boolean) => {
        setWonModal(value);
    }

    const handleLost = (value: boolean) => {
        setLostModal(value);
    }

    const resetCharacterSelection = () => {
        setOpponentCharacter(null);
        handleCharacterSelect(null);
    }

    const handlePlayGame = async () => {
        if (userCharacter && betAmount && opponentCharacter) {
            setIsLoading(true);
            try {
                await playGame(userCharacter, opponentCharacter, betAmount);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <DashboardLayout>
            {userCharacter && <YouWonModal open={wonModal} handleOpen={handleWon} character={userCharacter} />}
            {userCharacter && <YouLostModal open={lostModal} character={userCharacter} handleOpen={handleLost} />}
            <div style={{ minHeight: `calc(100vh - 270px)` }} className="flex flex-col items-center">
                {!userCharacter || !opponentCharacter ? (
                    <div>
                        <h2 className='text-center text-5xl'>Select your character:</h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-screen-xl mt-8'>
                            {characters.map(char => (
                                <CharacterSelection character={char.name} key={char.name} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center'>
                        <h2 className='text-5xl'>Place your bets</h2>
                        <div className='flex flex-row justify-center items-start gap-8 max-w-screen-xl mt-8'>
                            <div className='flex flex-col items-center'>
                                <div className='flex flex-row gap-2'>
                                    <p className='mb-2'>Selected Character:</p>
                                    <ArrowPathIcon
                                        className="h-6 w-6 cursor-pointer"
                                        onClick={() => resetCharacterSelection()}
                                    />
                                </div>
                                <CharacterBet character={userCharacter} />
                            </div>
                            <div className="flex items-center text-5xl self-center mx-8">VS</div>
                            <div className='flex flex-col items-center'>
                                <p className='mb-2'>Opponent Character:</p>
                                <OpponentCharacter character={opponentCharacter} />
                            </div>
                        </div>

                        {betAmount && (
                            <div className='mt-8'>
                                <Button
                                    disabled={isLoading}
                                    onClick={() => handlePlayGame()}
                                >
                                    {isLoading ? "Loading..." : "Start Game"}
                                </Button>
                            </div>
                        )
                        }
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DashboardSection;