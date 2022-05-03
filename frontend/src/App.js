import React, { Fragment } from 'react';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import TODOList from './components/TODO.js'
import ProjectList from './components/Project.js'
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
import axios from 'axios'
import Cookies from 'universal-cookie';
//import Footer from './components/Footer';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header';

import {HashRouter, BrowserRouter, Route, Link, Switch} from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена! Вали отсюда!</h1>
            <HashRouter>
                <Link to='/'>Главная</Link>
            </HashRouter>
        </div>
    )
}

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos': [],
           'project': [],
           's_project': []
       }
   }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }
    is_authenticated() {
        return this.state.token != ''
    }
    logout() {
        this.set_token('')
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete('http://151.248.125.11:8080/api/projects/${id}', {headers, headers})
        .then(response => {
            this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
    }

    createProject(name, git, author) {
        const headers = this.get_headers()
        const data = {name: name, url_git: git, author: author}
        axios.post('http://151.248.125.11:8080/api/projects/', data, {headers, headers})
        .then(response => {
            let new_project = response.data
            const author = this.state.users.filter((item) => item.id === new_project.author)[0]
            new_project.author = author
        this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
    }

    createTODO(project, text, author, enabled) {
        const headers = this.getHeaders()
        const data = {project: project, text: text, author: author, enabled: enabled}
        axios.post('http://151.248.125.11:8080/api/todos/', data, {headers})
            .then(response => {
                let newTodo = response.data;
                this.setState({todos: [...this.state.todos, newTodo]})
            })
            .catch(error => console.log(error))
    }

    searchProject(event) {
        const query = event.target.value
        let filteredProject = this.state.projects.filter((project) => project.name.includes(query))
        let allProjects = this.state.projects
        if (query) {
            this.setState({s_project: filteredProject})
        } else {
            this.setState({s_project: allProjects})
        }
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://151.248.125.11:8080/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        //const headers = this.get_headers()
        axios.get('http://151.248.125.11:8080/api/users/')
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))

        axios.get('http://151.248.125.11:8080/api/projects/')
            .then(response => {
                this.setState({
                    projects: response.data,
                    's_projects': response.data.results
                })
            }).catch(error => console.log(error))

        axios.get('http://151.248.125.11:8080/api/todos/')
            .then(response => {
                this.setState({todos: response.data})
            }).catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }

   componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
   }

   render () {
       return (
       <div className="App">
            <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Project</Link>
                        </li>
                        <li>
                            <Link to='/todo'>TODO</Link>
                        </li>
                        <li>
                        {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
                <Switch>
//                    <Route exact path='/' component={() => <ProjectList items={this.state.projects} />} />
                    <Route exact path='/todo' component={() => <TODOList items={this.state.todos} />} />
                    <Route exact path='/todo/create/' component={() => <TodoForm users={this.state.users} projects={this.state.projects}  createTODO={(project, text, author, enabled) => this.createTODO(project, text, author, enabled)}/>}/>
                    <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    <Route exact path='/project/create' component={() => <ProjectForm authors={this.state.authors} createProject={(name, url_git, authors) => this.createProject(name, url_git, authors)} />}/>
                    <Route exact path='/' component={() => <ProjectList items={this.state.s_project} deleteProject={(id)=>this.deleteProject(id)} searchProject={(event) => this.searchProject(event)} />} />
                    <Route component={NotFound404} />
                </Switch>
            </BrowserRouter>
       </div>
//       <Fragment>
//
//    <Header />
////    <Container>
//    <Row noGutters >
//    </Row>
//    <Row className="mt-4" >
//    </Row>
//        <Row noGutters >
//            <HashRouter>
//                <Switch>
//                    <Route exact path='/' component={() => <ProjectList items={this.state.projects} />} />
//                    <Route exact path='/todo' component={() => <TODOList items={this.state.todos} />} />
////                    <Route path="/todo/:id">
////                        <TODOList items={this.state.books} />
////                    </Route>
//                    <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
//                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
//                    <Route component={NotFound404} />
//                </Switch>
//            </HashRouter>
//
//        </Row>
//
//    </Container>
//
//    </Fragment>
       )
   }
}

export default App;
