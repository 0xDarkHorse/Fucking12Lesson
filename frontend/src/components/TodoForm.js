import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            text: '',
            author: '',
            enabled: 1
        }
    }

    handlerOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerOnSubmit(event) {
        this.props.createTODO(this.state.project, this.state.text, this.state.author, this.state.enabled);
        event.preventDefault();
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <form onSubmit={(event) => this.handlerOnSubmit(event)}>
                    <label htmlFor="project">Project:</label>
                        <select name="project" className="form-control"
                                onChange={(event) => this.handlerOnChange(event)}> {this.props.projects.map((project) =>
                            <option key={project.id} value={project.url_git}>{project.name}</option>)}
                        </select>
                    <div className='form-group'>
                        <label htmlFor="text">Text:</label>
                        <textarea className='form-control' name='text' value={this.state.text}
                                  onChange={(event) => this.handlerOnChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="user">Author:</label>
                        <select name="user" className="form-control"
                                onChange={(event) => this.handlerOnChange(event)}> {this.props.authors.map((author) =>
                            <option key={author.uid}>{author.username}</option>)}
                        </select>

                    </div>
                    <input type="submit" className="btn btn-primary" value="Save" />
                </form>
            </div>
        );
    }
}

export default TodoForm