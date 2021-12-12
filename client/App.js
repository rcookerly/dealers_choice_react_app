import React, { Component } from 'react';
import axios from 'axios';
import PlayerList from './PlayerList';
class App extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    }
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/players');
      this.setState({
        players: data
      });
    }
    catch(ex) {
      console.log('There was a problem making contact!');
    }
  }

  addPlayer = async() => {
    const { data } = await axios.post('/add');
    this.setState({
      players: [...this.state.players, data]
    });
  }

  deletePlayer = async(id) => {
    await axios.delete(`/delete/${id}`);
    this.setState({
      players: this.state.players.filter(player => {
        return player.id !== id;
      })
    });
  }

  render() {
    const { players } = this.state;
    return (
      <div id="main">
        <div id="navbar">
          <div>Baseball Roster</div>
          <img src="baseball.png"/>
        </div>
        <div id="container">
          <button onClick={this.addPlayer}>Add Player</button>
          <PlayerList
            players={players}
            deletePlayer={this.deletePlayer}
          />
        </div>
      </div>
    )
  }
};

export default App;
