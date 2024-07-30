import RadarChartComponent from './Radar';
import { characters } from '@/constants';
import { useGlobalContext } from '@/context/useGlobalContext';

interface Props {
    character: string;
}

const CharacterSelection = ({ character }: Props) => {
    const { handleCharacterSelect } = useGlobalContext();
    const characterObject = characters.find(item => item.name === character);

    if (!characterObject) return <div>None</div>;

    return (
        <div
            className="w-[350px] cursor-pointer max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
                background:
                    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            onClick={() => handleCharacterSelect(characterObject.name)}
        >
            <div className="flex flex-col sm:flex-row w-full gap-4 items-center">
                <div className="flex-col flex items-center justify-center">
                    <img src={characterObject?.image || '/characters/dino.png'} className="w-[250px] md:w-[250px]" />
                    <p>{characterObject.name}</p>
                </div>
                <RadarChartComponent
                    stats={characterObject.stats}
                    character={characterObject.name}
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}

export default CharacterSelection;
