import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getName } from '../ducks/reducer';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            pass: '',
            age: 0
        }
    }

    handleLogin = () => {
        this.props.getName(this.state.name)
        axios.get(`/auth/login/${this.state.name}/${this.state.pass}`).then(res=>{
            console.log(res.data)
        })
    }

    handleRegister = () => {
        this.props.getName(this.state.name)
        axios.post('/auth/register', { age: this.state.age, name: this.state.name, pass: this.state.pass }).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className='reg-log'>
                <h1>Welcome!</h1>
                <h3>Log in below or register</h3>
                <div>
                    <input onChange={(e) => this.setState({ name: e.target.value })} placeholder='username' />
                    <input onChange={(e) => this.setState({ pass: e.target.value })} placeholder='password' />
                    <input onChange={(e) => this.setState({ age: e.target.value })} placeholder='age' />
                </div>
                <div>
                    <Link to='/list'>
                    <button onClick={() => this.handleLogin()}>Log In</button>
                    <button onClick={() => this.handleRegister()}>Register</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapState = reduxState => reduxState

export default connect(mapState, { getName })(Login)