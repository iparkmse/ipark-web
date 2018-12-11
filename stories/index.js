import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import { text, color, object, boolean, number } from '@storybook/addon-knobs'

let buttonStyle = {
  backgroundColor: 'green',
  color: 'red',
  borderRadius: 2
}

storiesOf('Button', module)
  .addWithJSX('tom test', () => (
    <button
      disabled={boolean('Disabled', false)}
      style={{backgroundColor: color('Color', 'yellow')}}
    >
      {text('Label', 'hahaFun')}
    </button>
  )
  )
  .addWithJSX('with text', () => <button style={object('Style', buttonStyle)}>{text('Label', 'hello')}</button>)
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Span', module)
  .addWithJSX('span with number', () => <span>{number('Age', 78)}</span>)