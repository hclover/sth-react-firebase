import {Router, Route, IndexRoute } from 'react-router'
import App from './App'
// import About from './App/about'
// import React from 'react'
import React, {Component} from 'react'
import ShowTodo from './App/show-todo'
import {connect} from 'react-redux'
import {loadSections} from 'actions/todo'




// export default (props) => (
//   <Router {...props}>
//     <Route path='/' component={App} />
//     <Route path='/about' component={About} />
//   </Router>
// )

class Routes extends Component {
  constructor(props) {
    super(props)
    this.props.loadSections()
  }
  render() {
    return (
      <Router {...this.props}>
        <Route path='/'>
          <IndexRoute component={App} />
          <Route path='/:id' component={ShowTodo}/>
        </Route>
      </Router>
    )
  }
}
export default connect(null, {loadSections})(Routes)
