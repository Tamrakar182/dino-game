import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/utils/constants';
import { useGlobalContext } from '@/context/useGlobalContext';
import { enqueueSnackbar } from 'notistack';

export type Character = {
    name: string;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

const useDinoBattleGame = () => {
    const { signer, toggleRegister } = useGlobalContext();
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [winner, setWinner] = useState("");

    useEffect(() => {
        if (signer) {
            const dinoBattleContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            setContract(dinoBattleContract);
        }
    }, [signer]);

    const registerPlayer = async () => {
        if (contract) {
            const tx = await contract.registerPlayer();
            await tx.wait();
            enqueueSnackbar('Player registered successfully!');
            toggleRegister();
        } else {
            enqueueSnackbar("Issue with contract", { variant: 'error' });
        }
    };

    const playGame = async (character1: Character, character2: Character, betAmount: string) => {
        if (contract) {
            const tx = await contract.playGame(character1, character2, { value: ethers.utils.parseEther(betAmount) });
            const receipt = await tx.wait();
            const gameEndedEvent = receipt.events.find((event: any) => event.event === 'GameEnded');
            const winnerName = gameEndedEvent.args.winningCharacterName;
            setWinner(winnerName);
        } else {
            enqueueSnackbar("Issue with contract", { variant: 'error' });
        }
    };

    return {
        registerPlayer,
        playGame,
        winner
    };
};

export default useDinoBattleGame;
