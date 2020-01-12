import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formShow: false,
            email: '',
            password: '',
            errorStatus: false,
            errorText: ''
        }
        this.toggleForm = this.toggleForm.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.changeInput = this.changeInput.bind(this)
    }

    toggleForm() {
        this.setState({
            formShow: !this.state.formShow
        })
    }

    loginUser(e) {
        e.preventDefault()
        axios.post('http://127.0.0.1:3333/login',{
            email: this.state.email,
            password: this.state.password
        }, {})
            .then(response => {
                if(response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    this.setState({
                        errorStatus: false,
                        errorText: ''
                    })
                    this.props.loginUser();
                    this.props.setUser();
                } else {
                    this.setState({
                        errorStatus: true,
                        errorText: 'Пользователь не найден'
                    })
                    console.error('Пользователь не найден')
                }
                //console.log(response)
            })
            .catch(error => {
                console.error(error)
            })
    }

    changeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <button className={'btn btn-primary'} onClick={this.toggleForm}>Sign In</button>
                {this.state.formShow &&
                <div id="form">
                    {this.state.errorStatus &&
                    <div className='alert alert-danger'>{this.state.errorText}</div>
                    }

                    <form onSubmit={this.loginUser}>

                        <input type="email" name='email' value={this.state.email} placeholder='E-Mail' onChange={this.changeInput}/>
                        <input type="password" name='password' value={this.state.password} placeholder='Password' onChange={this.changeInput}/>
                        <button type='submit' className={'btn btn-success'}>Login</button>

                    </form>
                </div>
                }
            </div>
        );
    }
}

