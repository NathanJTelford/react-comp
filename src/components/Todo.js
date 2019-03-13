import React from 'react';
import axios from 'axios';

export default class toDo extends React.Component{
    state={
        list:[]
    }


    componentDidMount(){
        axios.get(`/list/items/${this.props.match.params.id}`).then((res)=>{
        this.setState({list:res.data})
        })
    }

    click(id){
        const notDone = this.state.list.filter(el=> el.id !== id)
        this.setState({list:notDone})
    }


    render(){
        console.log(this.state.list);
        
        const items = this.state.list.map((el,i)=>{
            return <div aria-label='Click to remove' key={i}  className='item_cards' onClick={()=>this.click(el.id)}>
                <h3>{el.item}</h3>
                <h3>{el.budget}</h3>
            </div>
        })
        return(
            <div className='toDo'>
            <div id='label'>
             <h1 style={{color:"blue"}} >ToDO</h1>
            </div>
             <hr/>
                <div>
                {items}
                </div>
                    
            </div>
        )
    }
}