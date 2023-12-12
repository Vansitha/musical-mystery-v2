
export default function TableRow({
  rank,
  playerName,
  country,
  totalGamesPlayed,
  highestScore,
  color,
}) {
  return (
    <tr className={`border-b border-test ${color} bg-opacity-30`}>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {rank}
      </th>
      <td className='px-6 py-4'>{playerName}</td>
      <td className='px-6 py-4'>{country}</td>
      <td className='px-6 py-4'>{totalGamesPlayed}</td>
      <td className='px-6 py-4'>{highestScore}</td>
    </tr>
  );
}
