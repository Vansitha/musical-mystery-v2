import TableRow from "./TableRow";

export default function Table({ data, className }) {
  return (
    <div className={`relative overflow-x-auto ${className}`}>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-light-green dark:text-black'>
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
        <tbody>
          <TableRow
            rank={1}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={2}
            playerName='Methsitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={3}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={4}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={5}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={6}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={7}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={8}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={9}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
          <TableRow
            rank={10}
            playerName='Gaveen Bandara'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
          />
        </tbody>
      </table>
    </div>
  );
}
