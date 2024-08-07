import Modal, { Props } from './Modal'
import { characters } from '@/constants';
import { Button } from './MovingBorder';
import { useGlobalContext } from '@/context/useGlobalContext';
import useDinoBattleGame from '@/hooks/useDinoGame';

interface YouLostModalProps extends Omit<Props, 'children'> {
    character: string
}

const YouLostModal = ({ handleOpen, open, character }: YouLostModalProps) => {
    const characterObject = characters.find(item => item.name === character);
    const { handleCharacterSelect, betAmountSelect } = useGlobalContext();
    const { resetWinner } = useDinoBattleGame();

    const playAgain = () => {
        handleCharacterSelect(null);
        betAmountSelect(null);
        handleOpen(false);
        resetWinner();
    }

    return (
        <Modal handleOpen={handleOpen} open={open}>
            <div className="flex-col flex items-center justify-center">
                <p className="text-2xl">YOU LOST!!!</p>
                <img src={characterObject?.image || "/characters/dino.png"} className="w-[250px] md:w-[350px]" />
                <p className="text-lg text-center">Did you know 90% of players quit before they hit it big!!</p>

                <div className='mt-2'>
                    <Button onClick={() => playAgain()}>Play Again</Button>
                </div>
            </div>

        </Modal>
    )
}

export default YouLostModal