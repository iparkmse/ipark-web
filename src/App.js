import React, { Component, Fragment } from 'react'
import firebaseBD from './firebase'

class App extends Component {
  state = {
    todos: [],
    content: ''
  }

  componentDidMount() {
    firebaseBD.collection('todolist').onSnapshot(snapshot => {
      let changes = snapshot.docChanges()
      changes.map(change => {
        if (change.type === 'added') return this.setState({todos: [...this.state.todos, {id: change.doc.id, item: change.doc.data().item}]})
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    firebaseBD.collection('todolist').add({item: this.state.content})
    this.setState({
      content: ''
    })
    // firebaseBD.collection('todolist').add({
    //   item: form.item.value
    // })
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  render() {
    const todoItems = this.state.todos.map(todo =>
      <li key={todo.id}>
        {todo.item}
      </li>
    )
    return (
      <Fragment>
        <h3>my todo list</h3>
        <ul>{todoItems}</ul>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='item' placeholder='add a todo' onChange={this.handleChange} value={this.state.content} />
          <button disabled={!this.state.content}>submit</button>
        </form>
      </Fragment>
    )
  }
}

export default App
