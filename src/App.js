import { Component } from 'react';
import './App.css';
import dataContacts from "./contacts.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: dataContacts.filter((curr, index) => index < 5 && curr)
    }
  }

  addRancomContact(newContacts) {
    const index = Math.floor(Math.random() * (dataContacts.length - 5) + 5);
    const randomContact = dataContacts[index];
    newContacts.push(randomContact);
    this.setState({
      contacts: newContacts
    })
  }

  sortByPopularity(newContacts) {
    const sortContacts = newContacts.sort((a, b) => b.popularity - a.popularity);

    this.setState({
      contacts: sortContacts
    })
  }

  sortByName(newContacts) {
    const sortContacts = newContacts.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    });

    this.setState({
      contacts: sortContacts
    })
  }

  deleteContact(index, newContacts) {
    newContacts.splice(index, 1);
    this.setState({
      contacts: newContacts
    })
  }

  render() {
    const newContacts = [...this.state.contacts];

    return (
      <div className="App" style={{ margin: "16px auto" }}>
        <h1>Iron Contact</h1>
        <button
          style={
            {
              padding: "8px"
            }
          }
          onClick={
            () => {
              this.addRancomContact(newContacts)
            }
          }>
          Add random contact
        </button>
        <button
          style={
            {
              padding: "8px"
            }
          }
          onClick={
            () => {
              this.sortByPopularity(newContacts)
            }
          }>
          Sort by popularity
        </button>
        <button
          style={
            {
              padding: "8px"
            }
          }
          onClick={
            () => {
              this.sortByName(newContacts)
            }
          }>
          Sort by name
        </button>
        <table style={{ margin: "16px auto" }}>
          <tbody>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
            </tr>
            {
              this.state.contacts.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.pictureUrl}
                        style={
                          {
                            width: "70px",
                            height: "100px",
                            margin: "0 8px 0 0"
                          }
                        }
                        alt="cover"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.popularity.toFixed(2)}</td>
                    <td>{item.wonOscar && <span>🏆</span>}</td>
                    <td>{item.wonEmmy && <span>🏆</span>}</td>
                    <td>
                      <button style={
                        {
                          padding: "8px"
                        }
                      } onClick={() => { this.deleteContact(index, newContacts) }}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
