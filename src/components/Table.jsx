import TableRow from "./TableRow";

export default function Table({ data, className }) {
  return (
    <div className={`relative overflow-x-auto w-full ${className}`}>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-jade dark:text-black'>
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
            rank={"1 🥇"}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={false}
          />
          <TableRow
            rank={"2 🥈"}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={true}
          />
          <TableRow
            rank={"3 🥉"}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={false}
          />
          <TableRow
            rank={"4"}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={true}
          />
          <TableRow
            rank={5}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={false}
          />
          <TableRow
            rank={6}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={true}
          />
          <TableRow
            rank={7}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={false}
          />
          <TableRow
            rank={8}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={true}
          />
          <TableRow
            rank={9}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={false}
          />
          <TableRow
            rank={10}
            playerName='Vansitha Ratnayake'
            country='Sri Lanka'
            totalGamesPlayed='10'
            highestScore='100'
            isGray={true}
          />
        </tbody>
      </table>
    </div>
  );
}
