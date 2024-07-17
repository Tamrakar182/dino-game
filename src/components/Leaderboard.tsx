
const leaderboardData = [
    { rank: 1, username: 'Player1', score: 1000 },
    { rank: 2, username: 'Player2', score: 950 },
    { rank: 3, username: 'Player3', score: 900 },
    { rank: 4, username: 'Player4', score: 850 },
    { rank: 5, username: 'Player5', score: 800 },
];

const Leaderboard = () => {
    return (
        <div className="w-full rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>
            <ul className="w-full border rounded-md p-4">
                {leaderboardData.map((player, index) => (
                    <li key={index} className="flex w-full justify-between items-center py-2">
                        <span className="text-white">{player.rank}. {player.username}</span>
                        <span className="text-white">{player.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
