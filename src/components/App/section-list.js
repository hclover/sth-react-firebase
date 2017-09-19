import React  from 'react'
import _ from 'lodash'

export default (props) => {
  return (
    <ul>
      {
        _.map(props.sections, (section, i) =>
        <li  key={i}> {section.name}
                      <button   onClick={props.onSectionRemoveClick.bind(this, section.id)}
                                type="button" className="btn btn-xs btn-danger img-circle" >&#xff38;</button>
          <ul>
            {
              _.map(section.todos, (item, i) =>
              <li key={i}>{item.name} : {item.stt}
                          <button onClick={props.onItemTodoChangeSttClick.bind(this, section.id, i, item.stt )}
                                  type="button" className="btn btn-xs btn-success img-circle" >&#x2713;</button>
                          <button onClick={props.onItemTodoRemoveClick.bind(this, section.id, i )}
                                  type="button" className="btn btn-xs btn-danger img-circle" >&#xff38;</button>
                          <h5>{item.dis}</h5>
              </li>)
            }
          </ul>
          <button onClick={props.onClick.bind(this, section.id)} >Add new item</button>
        </li>
       )
      }
    </ul>
  )
}
