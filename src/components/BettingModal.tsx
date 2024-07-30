import Modal, { Props } from './Modal';
import RadarChartComponent from './Radar';
import { characters } from '@/constants';
import { useState } from 'react';
import { Button } from './MovingBorder';
import { useGlobalContext } from '@/context/useGlobalContext';

interface YouLostModalProps extends Omit<Props, 'children'> {
    character: string;
}

const BettingModal = ({ handleOpen, open, character }: YouLostModalProps) => {
    const { betAmountSelect } = useGlobalContext();
    const characterObject = characters.find(item => item.name === character);
    const [bet, setBet] = useState('');

    const handleInputChange = (str: string) => {
        setBet(str);
    }

    if (!characterObject) return <div>None</div>;

    return (
        <Modal handleOpen={handleOpen} open={open} key={character}>
            <div className="flex flex-row w-full gap-4">
                <div className="flex-col flex items-center justify-center">
                    <img src={characterObject?.image || '/characters/dino.png'} className="w-[500px] md:w-[500px]" />
                    <p>{characterObject.name}</p>
                </div>
                <div className="flex-col flex items-center justify-between">
                    <RadarChartComponent stats={characterObject.stats} character={characterObject.name} />
                    <div className="flex flex-col py-8 items-center">
                        <p className="text-lg text-center">How much would you like to bet? (in ETH)</p>
                        <p className='text-[10px]'>NOTE: Bet Amount must be between 0.00001 ETH and 1 ETH</p>
                        <input
                            type="text"
                            value={bet}
                            onChange={(event) => handleInputChange(event.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-black my-2 w-full"
                        />
                        <Button
                            onClick={() => {
                                betAmountSelect(bet);
                                handleOpen(false);
                            }}
                        >Submit</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default BettingModal;
