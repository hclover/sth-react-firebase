import * as firebase from 'firebase'
import sectionModel from './models/section'
import todoModel from './models/todo'

let database
export const init = () => {
  let config = {
    apiKey: "AIzaSyDMt1O5wqmGHA9W1fbWMzDJ8vQJ5QZ3mGU",
    authDomain: "my-awesome-todo-45069.firebaseapp.com",
    databaseURL: "https://my-awesome-todo-45069.firebaseio.com",
    storageBucket: "my-awesome-todo-45069.appspot.com",
    messagingSenderId: "463778314187"
  }
  firebase.initializeApp(config)
  database = firebase.database()
}

// retrieve from firebase
// return promise object
export const getSectionsDB = () => {
  return database.ref('/').once('value')
}
// get specified section
export const getTodoDB = (sectionId) => {
  return database.ref(`/${sectionId}`).once('value')
}
// add new section
export const addSection = (name) => {
  let key = database.ref('/').push().key
  let model = sectionModel(key, name, firebase.database.ServerValue.TIMESTAMP)
  return database.ref('/'+ key).set(model)
}
// delete sections
export const deleteSection = (key) => {
  return database.ref('/'+ key).remove()
}
//delete item todo
export const deleteTodoItem = (id,key) => {
  return database.ref(`/${id}/todos/${key}`).remove()
}
//update stt of item todo
export const updateSttOfTodoItem = (id,key, stt) => {
  return database.ref(`/${id}/todos/${key}`).child(`stt`).set(stt);
}
// add new todo item into specified section
export const addTodoItem = (id, name, dis) => {
  return new Promise((resolve, reject) => {
    database.ref(`/${id}`).once('value').then((todo) => {
      let todos = todo.val().todos || []
      let key = database.ref(`/${id}`).push().key
      let stt = 'not yet'
      todos.push(todoModel(key, name, dis, stt, firebase.database.ServerValue.TIMESTAMP))
      database.ref(`/${id}/todos`).set(todos)
        .then( res => {resolve(res)})
        .catch( error => {reject(error)})
    })
  })
}
