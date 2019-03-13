import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Profile extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            newName:'',
            user:'',
            query:'',
            data:[],
            disabled:true
        }
    }

   async componentDidMount(){
       await this.setState({user:this.props.getName})
        
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
            console.log(res.data);
            
            this.setState({data:res.data})
        })
    }
    handleDisable = (e)=>{
        if(e.keyCode === 13 || 9)
        {this.setState({disabled:!this.state.disabled})}
    }

    render(){
        // console.log(q)
        let q = this.state.query
        let personalData = this.state.data.map((el,i)=>{
            return <h2 key={i}> Your {this.state.query} is : {el[q]} </h2>
        })
        return(
            <div className='profile'>
                <Link to='/list'>
                <h3>Lists</h3>
                </Link>
                {this.state.user}

                <h3>edit</h3>
                <input placeholder='Old Name' onChange={(e)=>this.setState({oldName:e.target.value})} onKeyDown={this.handleDisable} />
                <input placeholder='New Name' onChange={(e)=>this.setState({newName:e.target.value})} type='text' disabled={this.state.disabled}/>
                <button onClick={()=>this.handelEdit()}>Edit</button>
                <h3>delete</h3>
                <input placeholder='Name to delete' onChange={(e)=>this.setState({name:e.target.value})} />
                <button onClick={()=>this.handleDelete()}>Delete</button>

                <hr/>
                <h2>personal info</h2>
                <input placeholder='age/name/password' onChange={(e)=>this.setState({query:e.target.value})}/>
                <button onClick={()=>this.handelQuery()}>Find info</button>
                {personalData}
                <div>
                <fish-picture>
                <img src='https://images.unsplash.com/photo-1534043464124-3be32fe000c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' style={{width:"16rem"}} alt="Beautiful 'full moon beta' fish with blue and red fins against black background"/>
                </fish-picture>
                </div>

            </div>
        )
    }
}