import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            url_git: '',
            authors: props.authors[0].uid
        }
    }
    handleChange(event)
    {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handlerOnChangeMultipleSelect(event) {
        let options = event.target.childNodes
        let checkedValues = []
        options.forEach((option) => {
            if (option.selected) {
                checkedValues.push(option.value)
            }
        })

        this.setState({
            [event.target.name]: checkedValues
        })
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.url_git, this.state.authors);
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handlerOnSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="url_git">Git URL</label>
                    <input type="text" className='form-control' name='url_git' value={this.state.url_git} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="authors">authors
                        <select name="authors" multiple={true} className="form-control" onChange={(event) => this.handlerOnChangeMultipleSelect(event)}> {this.props.authors.map((author) =>
                            <option key={author.uid} value={author.uid}>{author.username}</option>)}
                        </select>
                    </label>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ProjectForm