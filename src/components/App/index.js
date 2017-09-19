import React, { Component } from 'react';
import {connect} from 'react-redux'
import {loadSections, createTodoItem, createSection, loadSpecificSection} from 'actions/todo'
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



render() {
    return (
      <div>
      <SectionList sections={this.props.sections} onClick={this.onSectionClick}/>
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
export default connect(mapStateToProps, {loadSections,createTodoItem, createSection,loadSpecificSection })(App)
