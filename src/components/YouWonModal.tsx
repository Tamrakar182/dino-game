import { useGlobalContext } from '@/context/useGlobalContext';
import Modal, { Props } from './Modal'
import { Button } from "./MovingBorder";
import { characters } from '@/constants';
import useDinoBattleGame from '@/hooks/useDinoGame';


interface YouWonModalProps extends Omit<Props, 'children'> {
    character: string
}

const YouWonModal = ({ handleOpen, open, character }: YouWonModalProps) => {
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
                <p className="text-2xl">YOU WON!!</p>
                <img src={characterObject?.image || "/characters/dino.png"} className="w-[250px] md:w-[350px]" />
                <div className='mt-2'>
                    <Button onClick={() => playAgain()}>Play Again</Button>
                </div>
            </div>

        </Modal>
    )
}

export default YouWonModal