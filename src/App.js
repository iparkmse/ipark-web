import React, { Component, Fragment } from 'react'
import LoginForm from './LoginForm'
import firebaseApp from './firebase'

const db = firebaseApp.firestore()

class App extends Component {
  state = {
    stalls: null
  }

  componentDidMount() {
    let tmpArr = []
    db.collection('stalls').orderBy('index').get()
      .then(snapshot => {
        snapshot.docs.map(doc => tmpArr.push(doc.data()))
        this.setState({ stalls: tmpArr })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    let copyStalls = this.state.stalls
    db.collection('stalls').onSnapshot(snapshot => {
      const changes = snapshot.docChanges()
      changes.map(change => {
        if (change.type === 'modified') {
          copyStalls[change.doc.data().index] = change.doc.data()
          this.setState({ stalls: copyStalls }, () => console.log('updated!:', change.doc.data(), this.state.stalls))
        }
      })
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
