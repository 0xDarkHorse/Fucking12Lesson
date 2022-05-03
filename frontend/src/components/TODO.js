import React from 'react'
import {Link} from 'react-router-dom'

const TODOItem = ({item, deleteTODO}) => {
    return (
        <tr>
            <td>{item.project}</td>
            <td>{item.text}</td>
            <td>{item.author}</td>
            <td><button onClick={()=>deleteTODO(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TODOList = ({items, deleteTODO}) => {
   return (
       <div>
       <table>
           <th>Проект</th>
           <th>Текст</th>
           <th>Author</th>
           <th></th>
           {items.map((item) => <TODOItem item={item} deleteTODO={deleteTODO} />)}
       </table>
       <Link to='/todo/create'>Create</Link>
       </div>
   )
}

export default TODOList