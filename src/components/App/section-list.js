import React  from 'react'
import _ from 'lodash'

export default (props) => {
  return (
    <ul>
      {
        _.map(props.sections, (section, i) =>
        <li  key={i}><h3>{section.name}</h3>
          <ul>
            {
              _.map(section.todos, (item, i) =>
              <li key={i}><h4>{item.name} </h4>  {item.dis}
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
