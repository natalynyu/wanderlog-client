import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'
import './Pictures.scss'
import pic7 from '../../css/7.png'
import pic5 from '../../css/5.png'
import pic8 from '../../css/8.png'
import pic12 from '../../css/12.png'
import pic15 from '../../css/15.png'
import pic17 from '../../css/17.png'

import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <React.Fragment>
        <form className='auth-form' onSubmit={this.onSignUp}>
          <h3>Sign Up</h3>

          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            value={email}
            type="email"
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
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <Button variant="outline-primary" type="submit">Sign Up</Button>
        </form>
        <section className="pictures">
          <img className="pic12" src={pic12} alt="pic12" />
          <img className="pic5" src={pic5} alt="pic5" />
          <img className="pic17" src={pic17} alt="pic17" />
          <img className="pic8" src={pic8} alt="pic8" />
          <img className="pic15" src={pic15} alt="pic15" />
          <img className="pic7" src={pic7} alt="pic7" />
        </section>
      </React.Fragment>
    )
  }
}

export default withRouter(SignUp)
