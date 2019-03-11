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
            lists: []

        }
    }

    componentDidMount(){
        console.log(this.state.lists)
        console.log(this.props)
    }


    handleAdd() {
        let newObj = [...this.state.task, { name: this.state.text, cost: this.state.num }]
        this.setState({
            task: newObj,
            text: '',
            num: 0
        })
    }

    async handleSave() {
        let res = await axios.post(`/add/list/${this.state.task}/${this.state.listName}`)
        this.setState({ list: res.data })
    }

    render() {
        let lists = this.state.lists.map((el, i) => {
            return <h2 key={i} >{el}</h2>
        })
        return (
            <div>
                <Link to='/profile'>
                    <h3>Profile</h3>
                </Link>
                <h3>Hey {this.props.getName}</h3>
                <h1>Why get your list done when you can kick back and watch youtube?</h1>
                <video controls width='250'>
                    <source src="https://www.youtube.com/embed/qGK6a6_tQEI" type='video/mp4' />
                    {/* <source src="https://www.youtube.com/embed/qGK6a6_tQEI" type='video/webm' /> */}
                </video>
                <p>JK it broke :(</p>
                <div>
                    <h1>TODO</h1>
                    <input placeholder='List Name' onChange={(e) => this.setState({ listName: e.target.value })} />
                    <br />
                    <input placeholder='Task' value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
                    <input placeholder='Cost' value={this.state.num} onChange={(e) => this.setState({ num: e.target.value })} />
                    <button onClick={() => this.handleAdd()} >Add Item</button>
                    <br />
                    <button onClick={() => this.handleSave()} >Save List</button>

                </div>
                <div>
                    <h1>Lists</h1>
                    {lists}
                </div>
            </div>
        )
    }
}

const mapState = reduxState => reduxState;

export default connect(mapState)(List)