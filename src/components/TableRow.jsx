import React from "react";

export default function TableRow({
  rank,
  playerName,
  country,
  totalGamesPlayed,
  highestScore,
}) {
  return (
    <tr className='bg-black'>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {rank}
      </th>
      <td className='px-6 py-4'>{playerName}</td>
      <td className='px-6 py-4 text-center'>{country}</td>
      <td className='px-6 py-4 text-center'>{totalGamesPlayed}</td>
      <td className='px-6 py-4 text-center'>{highestScore}</td>
    </tr>
  );
}
