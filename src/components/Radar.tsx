import { useMemo } from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
} from 'recharts';

interface Props {
    stats: {
        name: string;
        value: number;
    }[];
    character: string;
    width?: number;
    height?: number;
    fontSize?: number;
}

const RadarChartComponent = ({ stats, character, width = 400, height = 300, fontSize = 12 }: Props) => {
    const memoised = useMemo(() => stats, [stats])
    return (
        <RadarChart width={width} height={height} data={memoised} key={character}>
            <PolarGrid />
            <PolarAngleAxis
                dataKey="name"
                fontSize={fontSize}
            />
            <Radar
                name={character}
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
        </RadarChart>
    );
}

export default RadarChartComponent;
