import React from 'react';

const PlayerList = ({ players, deletePlayer }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Home Town</th>
          <th>Birth Year</th>
          <th>Position</th>
          <th>Remove Player</th>
        </tr>
        {
          players.map(player => {
            return (
              <tr key={player.id}>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.homeTown}</td>
                <td>{player.birthYear}</td>
                <td>{player.position}</td>
                <td>
                  <button onClick={() => deletePlayer(player.id)}>X</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
};

export default PlayerList;
