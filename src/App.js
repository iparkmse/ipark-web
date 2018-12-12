import React, { Fragment, Component } from 'react'
import Counter from './components/Counter'
import CounterReducer from './reducers/CounterReducer'
import { createStore } from 'redux'

const store = createStore(CounterReducer)

class App extends Component {
  render() {
    return (
      <Fragment>
        <Counter
          initialValue = {store.getState()}
          HandleClick={() => store.dispatch({ type: 'INCREMENT' })}
        />
      </Fragment>
    )
  }
}


store.subscribe(() => {
  console.log('state updated')
  console.log(store.getState())
})

export default App
