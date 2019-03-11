import React from 'react';
import axios from 'axios';
import { getName } from '../ducks/reducer';
import { Link } from 'react-router-dom';

export default class Profile extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            newName:'',
            user:'',
            query:'',
            data:[]
        }
    }

   async componentDidMount(){
       await this.setState({user:this.props.age})
        
    }

    handleDelete = () =>{
        axios.delete(`/auth/delete/${this.state.name}`)
    }

    handelEdit = () =>{
        axios.put(`/auth/edit/${this.state.newName}`).then(res=>{
            this.setState({user:res.data})
        })
    }

    handelQuery(){
        axios.get(`/get/data/query?q=${this.state.query}`).then(res=>{
            this.setState({data:res.data})
        })
    }

    render(){
        return(
            <div>
                <Link to='/list'>
                <h3>Lists</h3>
                </Link>
                {this.state.user}

                <h3>edit</h3>
                <input placeholder='Old Name' onChange={(e)=>this.setState({oldName:e.target.value})}/>
                <input placeholder='New Name' onChange={(e)=>this.setState({newName:e.target.value})}/>
                <button onClick={()=>this.handelEdit()}>Edit</button>
                <h3>delete</h3>
                <input placeholder='Name to delete' onChange={(e)=>this.setState({name:e.target.value})} />
                <button onClick={()=>this.handleDelete()}>Delete</button>

                <hr/>
                <h2>personal info</h2>
                <input placeholder='age/name/password' onChange={(e)=>this.setState({query:e.target.value})}/>
                <button onClick={()=>this.handelQuery()}>Find info</button>
                {this.state.data}

            </div>
        )
    }
}