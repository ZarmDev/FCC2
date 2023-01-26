import './App.css';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { marked } from 'marked'

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = configureStore({
  reducer: messageReducer
})

const initialVal = `
# Heading
## Meow
[A link](https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-markdown-previewer)

${'`<p>Test</p>`'}
${'```'}
${`
componentDidMount() {
  document.getElementById('preview').innerHTML = marked.parse(this.state.input);
}
`}
${'```'}

- ListItem1
- ListItem2

> HEY BRO

**SUP MEOW**

![freeCodeCamp](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

// Change code below this line
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    
    // Remove property 'messages' from Presentational's local state
    this.state = {
      input: initialVal
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    var target = event.target.value;
    target = target.replace(/\r/g, 't')
    this.setState({
      input: target
    });
  }
  submitMessage() {
  
    // Call 'submitNewMessage', which has been mapped to Presentational's props, with a new message;
    // meanwhile, remove the 'messages' property from the object returned by this.setState().
    this.props.submitNewMessage(this.state.input);
    this.setState({
      input: ''
    });
  }
  componentDidMount() {
    document.getElementById('preview').innerHTML = marked.parse(this.state.input);
  }
  render() {
    try {
    document.getElementById('preview').innerHTML = marked.parse(this.state.input);
    } catch {
      //
    }
    return (
      <div>
        <h2>Editor</h2>
        <textarea id="editor" value={this.state.input} onChange={this.handleChange}></textarea><br></br>
        <h2>Preview</h2>
        <div id="preview"></div>
        <ul>
           {/* The messages state is mapped to Presentational's props; therefore, when rendering,
               you should access the messages state through props, instead of Presentational's
               local state. */}
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};
// Change code above this line

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};

export default AppWrapper;