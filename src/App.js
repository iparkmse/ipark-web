import React, { Component, Fragment } from 'react'
import LoginForm from './LoginForm'
import firebaseApp from './firebase'

const db = firebaseApp.database()

class App extends Component {
  state = {
    stalls: null
  }

  componentDidMount() {
    db.ref('stalls').once('value')
      .then(snapshot => {
        let stallsData = snapshot.val()
        let tmpArr = []
        for (let stall in stallsData) {
          tmpArr.push(stallsData[stall])
        }
        this.setState({ stalls: tmpArr })
      }, err => console.log(err))
  }

  componentDidUpdate() {
    let copyStalls = this.state.stalls
    db.ref('stalls').on('child_changed', childSnapshot => {
      copyStalls[childSnapshot.val().index] = childSnapshot.val()
      this.setState({ stalls: copyStalls })
    }, err => console.log(err))
  }

  render() {
    const stallStatus = (this.state.stalls) ? this.state.stalls.map(stall => (
      <li key={stall.ID}>{stall.ID + ' ' + stall.status}</li>
    )) : null
    if (this.state.stalls) {
      return (
        <Fragment>
          <LoginForm />
          <div>{stallStatus}</div>
        </Fragment>
      )
    }

    return <div>Loading...</div>

  }
}

export default App
