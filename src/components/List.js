import React from 'react';
import { Link } from 'react-router-dom';

export default class List extends React.Component{
    constructor(){
        super()
        this.state={
            listName:'',

        }
    }

    render(){
        return(
            <div>
                <Link to='/profile'>
                <h3>Profile</h3>
                </Link>
                <h3>Hey {this.props.name}</h3>
                <h1>Why get your list done when you can kick back and watch youtube?</h1>
                <video controls width='250'>
                    <source src="https://www.youtube.com/embed/qGK6a6_tQEI" type='video/mp4' />
                    {/* <source src="https://www.youtube.com/embed/qGK6a6_tQEI" type='video/webm' /> */}
                </video>
                <p>JK it broke :(</p>
                <div>
                    <h1>TODO</h1>
                    <input placeholder='List Name' onChange={(e)=>this.setState({listName:e.target.value})}/>
                    
                </div>
                <div>
                    <h1>Lists</h1>
                </div>
            </div>
        )
    }
    }
  