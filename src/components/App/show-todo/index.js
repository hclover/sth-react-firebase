import React, {Component} from 'react'
import TodoList from './todo-list'
import {getSectionById} from 'reducers/todo'
import {connect} from 'react-redux'
import {createTodoItem, loadSections, loadTodos, loadHomepage} from 'actions/todo'

class ShowTodo extends Component {
  componentDidMount() {
    this.props.loadSections()
    this.props.loadTodos(this.props.params.id)
  }
  onSubmit = (e) => {
    e.preventDefault()
    let ref = this.refs['todo-item-name']
    let todoName = ref.value
    let reff = this.refs['todo-item-dis']
    let todoDis = reff.value
    this.props.createTodoItem(this.props.params.id, todoName, todoDis)
    ref.value = ''
    this.props.loadHomepage()

  }

  render() {
    return (
      <div>
        <h4>{this.props.section.name}</h4>
        <h4>{this.props.params.id}</h4>
        <TodoList todos={this.props.section.todos}/>
        <form onSubmit={this.onSubmit}>
          <input ref="todo-item-name" placeholder="name" required/>
          <input ref="todo-item-dis" placeholder="discript" />
          <button>Add new item</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
  //passing todo reducer and section's id
  return {section: getSectionById(state.todo, props.route.id)}
}
export default connect(mapStateToProps, {createTodoItem, loadHomepage,loadSections, loadTodos})(ShowTodo)
