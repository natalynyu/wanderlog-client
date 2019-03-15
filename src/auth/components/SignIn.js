import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

import './Pictures.scss'

import pic9 from '../../css/9.png'
import pic10 from '../../css/10.png'
import pic11 from '../../css/11.png'
import pic13 from '../../css/13.png'
import pic20 from '../../css/20.png'
import pic19 from '../../css/19.png'

import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/itineraries'))
      .catch(e => {
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <React.Fragment>
        <form className='auth-form' onSubmit={this.onSignIn}>
          <h3>Sign In</h3>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <Button variant="outline-primary" type="submit">Sign In</Button>
        </form>
        <section className="pictures">
          <img className="pic9" src={pic9} alt="pic9" />
          <img className="pic10" src={pic10} alt="pic10" />
          <img className="pic11" src={pic11} alt="pic11" />
          <img className="pic13" src={pic13} alt="pic13" />
          <img className="pic20" src={pic20} alt="pic20" />
          <img className="pic19" src={pic19} alt="pic19" />
        </section>
      </React.Fragment>
    )
  }
}

export default withRouter(SignIn)
