import React, {Component} from 'react'; 

class UserList extends Component {
    constructor(){
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount(){
        fetch('http://localhost:4000/api/admin/allUsers', {method: 'GET'})
        .then(result => result.json())
        .then(items => this.setState({items}))
    }
    render(){
        return(
            <div>
                <h1>Lista de usuarios</h1>
                <div className="col-12 col-md-2">
                    <Sidebar /> {/* sidebar requerido*/}
                </div>


               




            </div>
        )
    }
}

export default UserList;