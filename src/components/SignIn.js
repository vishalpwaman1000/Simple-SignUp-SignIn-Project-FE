import React, { Component } from 'react'
import AuthServices from '../services/AuthServices'
import './SignUp.scss'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

const authServices = new AuthServices()

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      Radiovalue: 'User',
      UserName: '',
      UserNameFlag: false,
      Password: '',
      PasswordFlag: false,
    }
  }

  handleRadioChange = (e) => {
    this.setState({ Radiovalue: e.target.value })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(
      { [name]: value },
      console.log('Name : ', name, 'Value : ', value),
    )
  }

  handleSignUp = (e) => {
    this.props.history.push('/')
  }

  CheckValidation() {
    console.log('CheckValidation Calling...')

    this.setState({ UserNameFlag: false, PasswordFlag: false })

    if (this.state.UserName === '') {
      this.setState({ UserNameFlag: true })
    }
    if (this.state.Password === '') {
      this.setState({ PasswordFlag: true })
    }
  }

  handleSubmit = (e) => {
    this.CheckValidation()
    if (this.state.UserName !== '' && this.state.Password !== '') {
      console.log('Acceptable')
      let data = {
        userName: this.state.UserName,
        password: this.state.Password,
        role: this.state.Radiovalue,
      }
      authServices
        .SignIn(data)
        .then((data) => {
          console.log('Data : ', data)
          if (data.data.isSuccess) {
            this.props.history.push('/HomePage')
          } else {
            console.log('Something Went Wrong')
          }
        })
        .catch((error) => {
          console.log('Error : ', error)
        })
    } else {
      console.log('Not Acceptable')
    }
  }

  render() {
    console.log('State : ', this.state)
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Header">Sign In</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="UserName"
                label="UserName"
                variant="outlined"
                size="small"
                error={this.state.UserNameFlag}
                value={this.state.UserName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleChange}
              />
              <RadioGroup
                className="Roles"
                name="Role"
                value={this.state.Radiovalue}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel
                  className="RoleValue"
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  className="RoleValue"
                  value="User"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </form>
          </div>
          <div className="Buttons" style={{ alignItems: 'flex-start' }}>
            <Button className="Btn" color="primary" onClick={this.handleSignUp}>
              Sign Up
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
