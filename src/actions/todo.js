import { getSectionsDB, getTodoDB, addSection,deleteSection, updateSttOfTodoItem,deleteTodoItem, addTodoItem } from 'javascripts/firebase'
import actionType from 'constants'
import {push} from 'react-router-redux'

export const loadSections = () => {
 return dispatch => {
  dispatch({
   type: actionType.LOAD_SECTIONS_REQUEST
  })
  getSectionsDB()
   .then(sections => {
    dispatch({
     type: actionType.LOAD_SECTIONS_SUCCESS,
     payload: sections.val()
    })
   })
   .catch(error => {
    dispatch({
     type: actionType.LOAD_SECTIONS_FAILED,
     payload: error
    })
   })
 }
}

export const loadTodos = (sectionId) => {
 return dispatch => {
  dispatch({
   type: actionType.LOAD_TODOS_REQUEST
  })
  getTodoDB(sectionId)
   .then(sections => {
    dispatch({
     type: actionType.LOAD_TODOS_SUCCESS,
     payload: sections.val()
    })
   })
   .catch(error => {
    dispatch({
     type: actionType.LOAD_TODOS_FAILED,
     payload: error
    })
   })
 }
}
export const createSection = (name) => {
 return dispatch => {
  dispatch({
   type: actionType.ADD_SECTION_REQUEST
  })
  addSection(name)
   .then(res => {
    loadSections()(dispatch) //refresh the data to keep up-to-date
    dispatch({
     type: actionType.ADD_SECTION_SUCCESS
    })
   })
   .catch(error => {
    dispatch({
     type: actionType.ADD_SECTION_FAILED,
     payload: error
    })
   })
 }
}

export const removeSection = (key) => {
 return dispatch => {
  dispatch({
   type: actionType.DELETE_SECTION_REQUEST
  })
  deleteSection(key)
   .then(res => {
    loadSections()(dispatch) //refresh the data to keep up-to-date
    dispatch({
     type: actionType.DELETE_SECTION_SUCCESS
    })
   })
   .catch(error => {
    dispatch({
     type: actionType.DELETE_SECTION_FAILED,
     payload: error
    })
   })
 }
}

export const createTodoItem = (sectionId, name, dis) => {
  return (dispatch) => {
    dispatch({
      type: actionType.CREATE_TODO_REQUEST
    })
    addTodoItem(sectionId, name, dis)
      .then(res => {
        loadSections()(dispatch)
        dispatch({
          type: actionType.CREATE_TODO_SUCCESS,
          payload: res
        })
      })
      .catch(error => {
        dispatch({
          type: actionType.CREATE_TODO_FAILED,
          payload: error
        })
      })
   }
}

export const changeSttOfTodoItem = (id,key, stt) => {
  return (dispatch) => {
    dispatch({
      type: actionType.CHANGE_STT_TODO_REQUEST
    })
    updateSttOfTodoItem(id,key, stt)
      .then(res => {
        loadSections()(dispatch)
        dispatch({
          type: actionType.CHANGE_STT_TODO_SUCCESS,
          payload: res
        })
      })
      .catch(error => {
        dispatch({
          type: actionType.CHANGE_STT_TODO_FAILED,
          payload: error
        })
      })
   }
}

export const removeTodoItem = (id, key) => {
 return dispatch => {
  dispatch({
   type: actionType.DELETE_TODO_REQUEST
  })
  deleteTodoItem(id, key)
   .then(res => {
    loadSections()(dispatch) //refresh the data to keep up-to-date
    dispatch({
     type: actionType.DELETE_TODO_SUCCESS
    })
   })
   .catch(error => {
    dispatch({
     type: actionType.DELETE_TODO_FAILED,
     payload: error
    })
   })
 }
}

export const loadSpecificSection = (sectionId) => {
  return (dispatch) => {
    dispatch(push(`/${sectionId}`))
  }
}

export const loadHomepage = (sectionId) => {
  return (dispatch) => {
    dispatch(push(`/`))
  }
}
