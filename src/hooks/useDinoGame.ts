import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/utils/constants';
import { useGlobalContext } from '@/context/useGlobalContext';
import { enqueueSnackbar } from 'notistack';
import { characters } from '@/constants';

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
    const [winner, setWinner] = useState<string | null>(null);

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
            try {
                const tx = await contract.registerPlayer();
                enqueueSnackbar('Wait for Transaction to complete', {variant:"info"});
                await tx.wait();
                enqueueSnackbar('Player registered successfully!', {variant:"info"});
                toggleRegister();
            } catch (error: any) {
                if (error.code === 4001) {
                    enqueueSnackbar("Transaction rejected by user", { variant: 'error' });
                } else {
                    enqueueSnackbar("Error registering player", { variant: 'error' });
                }
            }
        } else {
            enqueueSnackbar("Issue with contract", { variant: 'error' });
        }
    };

    const playGame = async (character1: string, character2: string, betAmount: string) => {
        const playerCharacterData = characters.find(item => item.name === character1);
        const opponentCharacterData = characters.find(item => item.name === character2);

        if(!playerCharacterData || !opponentCharacterData) {
            enqueueSnackbar("Issue with character selection", { variant: 'error' });
            return;
        }

        const playerCharacter: Character = {
            name: playerCharacterData.name,
            attack: playerCharacterData.stats.find(stat => stat.name === "Atk")?.value || 0,
            defense: playerCharacterData.stats.find(stat => stat.name === "Def")?.value || 0,
            specialAttack: playerCharacterData.stats.find(stat => stat.name === "Sp. Atk")?.value || 0,
            specialDefense: playerCharacterData.stats.find(stat => stat.name === "Sp. Def")?.value || 0,
            speed: playerCharacterData.stats.find(stat => stat.name === "Spd")?.value || 0
        };

        const opponentCharacter: Character = {
            name: opponentCharacterData.name,
            attack: opponentCharacterData.stats.find(stat => stat.name === "Atk")?.value || 0,
            defense: opponentCharacterData.stats.find(stat => stat.name === "Def")?.value || 0,
            specialAttack: opponentCharacterData.stats.find(stat => stat.name === "Sp. Atk")?.value || 0,
            specialDefense: opponentCharacterData.stats.find(stat => stat.name === "Sp. Def")?.value || 0,
            speed: opponentCharacterData.stats.find(stat => stat.name === "Spd")?.value || 0
        };

        if (contract) {
            try {
                const tx = await contract.playGame(playerCharacter, opponentCharacter, { value: ethers.utils.parseEther(betAmount) });
                enqueueSnackbar('Wait for Transaction to complete', {variant:"info"});
                const receipt = await tx.wait();
                const gameEndedEvent = receipt.events.find((event: any) => event.event === 'GameEnded');
                const winnerName = gameEndedEvent.args.winningCharacterName;
                setWinner(winnerName);
            } catch (error: any) {
                if (error.code === 4001) {
                    enqueueSnackbar("Transaction rejected by user", { variant: 'error' });
                } else {
                    enqueueSnackbar("Error playing game", { variant: 'error' });
                }
            }
        } else {
            enqueueSnackbar("Issue with contract", { variant: 'error' });
        }
    };

    const resetWinner = () => {
        setWinner(null);
    }

    return {
        registerPlayer,
        playGame,
        winner,
        resetWinner,
    };
};

export default useDinoBattleGame;
