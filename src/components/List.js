import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

class List extends React.Component {
    constructor() {
        super()
        this.state = {
            listName: '',
            text: '',
            num: 0,
            task: [],
            lists: [],
            switch:true

        }
    }

    componentDidMount() {
        axios.get('/lists').then(res => {
            console.log(res.data);

            this.setState({ lists: res.data })

        })
    }

    async componentDidUpdate(prevProps, prevState){
      let res = await axios.get('/lists')
      if(  prevState.lists !== res.data ){
         this.update(res.data)
      }
    }

        update=(val)=>{this.setState({
            lists:val,
            switch:false
        })}



    handleAdd() {
        let newObj = [...this.state.task, { name: this.state.text, cost: this.state.num }]
        this.setState({
            task: newObj,
            text: '',
            num: 0
        })
    }

    async handleSave() {
        let res = await axios.post(`/add/list/${this.state.listName}`, { task: this.state.task })
        this.setState({
            list: res.data,
            task: []
        })
    }

    render() {
        console.log(this.state.lists);

        let lists = this.state.lists.map((el, i) => {
            return <div aria-label='Click to Show Tto do Items' className='lists'><Link to={`/todo/${el.id}`}> <h2 key={i} >{el.name}</h2></Link> </div>
        })
        return (
            <div>
                <Link to='/profile'>
                    <h3>Profile</h3>
                </Link>
                <h3>Hey {this.props.getName}</h3>
                <h1>Why get your list done when you can kick back and watch youtube?</h1>
                {/* <video controls width="871" height="490" src="https://www.youtube.com/embed/kRyUsI5zuqM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen >
                </video> */}
                <iframe width="871" height="490" src="https://www.youtube.com/embed/kRyUsI5zuqM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div>
                    <h1>TODO</h1>
                    <input placeholder='List Name' onChange={(e) => this.setState({ listName: e.target.value })} required/>
                    <br />
                    <input placeholder='Task' value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} required/>
                    <input placeholder='Cost' value={this.state.num} onChange={(e) => this.setState({ num: e.target.value })} required/>
                    <button onClick={() => this.handleAdd()} >Add Item</button>
                    <br />
                    <button onClick={() => this.handleSave()} >Save List</button>
                    <div className='list_container'>
                    <span style={{width:"100vw"}}>
                        <h1>Lists</h1>
                    </span>
                    {lists}
                </div>

                </div>
             
            </div>
        )
    }
}

const mapState = reduxState => reduxState;

export default connect(mapState)(List)