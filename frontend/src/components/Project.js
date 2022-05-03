import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>{item.pr}</td>
            <td>{item.fuck_name}</td>
            <td>{item.url_git}</td>
            <td>{item.authors}</td>
            <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({items, deleteProject, searchProject}) => {
   return (
       <div>
       <form className="form-inline mt-2 mt-md-0">
            <input className="form-control mr-sm-2" onChange={(event) => searchProject(event)} type="search" placeholder="Search"/>
       </form>
       <table>
           <th>ID</th>
           <th>Fuck Name</th>
           <th>URL git</th>
           <th>Authors</th>
           <th></th>
           {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
       </table>
       <Link to='/project/create'>Create</Link>
       </div>
   )
}

export default ProjectList