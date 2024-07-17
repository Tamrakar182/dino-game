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
}

const RadarChartComponent = ({ stats, character }: Props) => {
    const memoised = useMemo(() => stats, [stats])
    return (
        <RadarChart width={400} height={300} data={memoised} key={character}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar name={character} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    );
}

export default RadarChartComponent;
