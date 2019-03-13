import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

import './Pictures.scss'

import pic33 from '../../css/33.png'
import pic34 from '../../css/34.png'
import pic35 from '../../css/35.png'
import pic36 from '../../css/36.png'
import pic37 from '../../css/37.png'
import pic38 from '../../css/38.png'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <React.Fragment>
        <form className='auth-form' onSubmit={this.onChangePassword}>
          <h3>Change Password</h3>
          <label htmlFor="oldpw">Old Password</label>
          <input
            required
            name="oldPassword"
            value={oldPassword}
            type="password"
            placeholder="Old Password"
            onChange={this.handleChange}
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            required
            name="newPassword"
            value={newPassword}
            type="password"
            placeholder="New Password"
            onChange={this.handleChange}
          />
          <button type="submit">Change Password</button>
        </form>
        <section className="pictures">
          <img className="pic33" src={pic33} alt="pic33" />
          <img className="pic34" src={pic34} alt="pic34" />
          <img className="pic35" src={pic35} alt="pic35" />
          <img className="pic36" src={pic36} alt="pic36" />
          <img className="pic37" src={pic37} alt="pic37" />
          <img className="pic38" src={pic38} alt="pic38" />
        </section>
      </React.Fragment>
    )
  }
}

export default withRouter(ChangePassword)
