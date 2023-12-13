import TableRow from "./TableRow";

const rankColors = {
  1: { color: "bg-gold", medalEmoji: "🥇" },
  2: { color: "bg-silver", medalEmoji: "🥈" },
  3: { color: "bg-bronze", medalEmoji: "🥉" },
};

const userRankColor = "bg-black";

export default function Table({ data, className }) {
  function populateCards(users) {
    return users.map((user) => {
      let cardColor = "";
      let medalEmoji = "";
      if (rankColors.hasOwnProperty(user.rank)) {
        cardColor = rankColors[user.rank].color;
        medalEmoji = rankColors[user.rank].medalEmoji;
      }
      if (user.isUserRank && cardColor != "") {
        cardColor = userRankColor;
      }

      return (
        <TableRow
          key={user.rank}
          rank={medalEmoji ? `${user.rank} ${medalEmoji}` : user.rank}
          playerName={user.name}
          country={user.country}
          totalGamesPlayed={user.totalGamesPlayed}
          highestScore={user.highScore}
          color={cardColor}
        />
      );
    });
  }

  return (
    <div className={`relative overflow-x-auto w-full ${className}`}>
      {data.length == 0 ? (
        <div className='mt-5'>
          No players on the leaderboard yet. Be the first to play! ✨
        </div>
      ) : (
        <table className='w-full text-sm text-left'>
          <thead className='text-xs text-gray-700 uppercase dark:text-white'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Rank
              </th>
              <th scope='col' className='px-6 py-3'>
                Player Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Country
              </th>
              <th scope='col' className='px-6 py-3'>
                Total Games Played
              </th>
              <th scope='col' className='px-6 py-3'>
                Highest Score
              </th>
            </tr>
          </thead>
          <tbody>{populateCards(data)}</tbody>
        </table>
      )}
    </div>
  );
}
