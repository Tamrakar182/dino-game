import Modal, { Props } from './Modal'
import { Button } from "./MovingBorder";
import { characters } from '@/constants';

interface YouWonModalProps extends Omit<Props, 'children'> {
    character: string
}

const YouWonModal = ({ handleOpen, open, character }: YouWonModalProps) => {
    const characterObject = characters.find(item => item.name === character);

    return (
        <Modal handleOpen={handleOpen} open={open}>
            <div className="flex-col flex items-center justify-center">
                <p className="text-2xl">YOU WON!!</p>
                <img src={characterObject?.image || "/characters/dino.png"} className="w-[250px] md:w-[350px]" />
                <Button>Claim your winnings!!</Button>
            </div>

        </Modal>
    )
}

export default YouWonModal