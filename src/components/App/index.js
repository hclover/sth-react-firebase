import React, { Component } from 'react';
import {connect} from 'react-redux'
import {loadSections, createTodoItem,changeSttOfTodoItem, createSection,removeSection, removeTodoItem,loadSpecificSection} from 'actions/todo'
import _ from 'lodash'
import SectionList from './section-list'


class App extends Component {
  componentDidMount() {
    this.props.loadSections()
  }
onSubmit = (e) => {
    e.preventDefault()
    let ref = this.refs['section-name']
    let sectionName = ref.value
    this.props.createSection(sectionName)
    ref.value = ''
  }
  onSectionClick = (sectionId) => {
      this.props.loadSpecificSection(sectionId)
   }
  onSectionRemoveClick = (key) => {
       this.props.removeSection(key)
  }

  onItemTodoRemoveClick = (id, key) => {
       this.props.removeTodoItem(id, key)
  }

  onItemTodoChangeSttClick = (id, key, sttNow) => {
    let stt = ''
    if (sttNow == 'not yet'){
      stt = 'done'
    }
    else {
      stt = 'not yet'
    }
    console.log(stt)
    this.props.changeSttOfTodoItem(id, key, stt)
  }


render() {
    return (
      <div>
      <SectionList
          sections={this.props.sections}
          onClick={this.onSectionClick}
          onSectionRemoveClick = {this.onSectionRemoveClick}
          onItemTodoRemoveClick = {this.onItemTodoRemoveClick}
          onItemTodoChangeSttClick = {this.onItemTodoChangeSttClick}
          />
      <form onSubmit={this.onSubmit}>
        <input ref="section-name" required/>
        <button>Add new section</button>
      </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sections: state.todo.sections
  }
}
export default connect(mapStateToProps, {loadSections,changeSttOfTodoItem,createTodoItem, createSection,removeTodoItem,removeSection,loadSpecificSection })(App)
