import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    passwordsList: [],
    searchWeb: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchWeb: event.target.value})
  }

  onAddPasswordItem = event => {
    event.preventDefault()
    console.log('yes')

    const {website, userName, password} = this.state
    const newPwdItem = {
      id: v4(),
      website,
      userName,
      password,
    }

    this.setState(prevState => ({
      website: '',
      userName: '',
      password: '',
      passwordsList: [...prevState.passwordsList, newPwdItem],
    }))
  }

  searchWebInList = () => {
    const {passwordsList, searchWeb} = this.state

    const searchedList = passwordsList.filter(eachItem =>
      eachItem.website.includes(searchWeb),
    )
    return searchedList
  }

  renderPasswordsList = () => {
    const searchedList = this.searchWebInList()

    if (searchedList.length === 0) {
      return (
        <div className="no-pwd-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-pwd-img"
          />
          <p className="pwd">No Passwords</p>
        </div>
      )
    }

    return (
      <ul className="passwords-list-container">
        {searchedList.map(eachItem => (
          <PasswordItem key={eachItem.id} itemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    const {website, userName, password} = this.state
    const searchedList = this.searchWebInList()

    return (
      <div className="app-container">
        <div className="app-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="input-section">
          <div className="pwd-manager-sm-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pwd-manager-sm"
            />
          </div>
          <div className="inputs-container">
            <form className="form-container" onSubmit={this.onAddPasswordItem}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>

              <div className="input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={userName}
                />
              </div>
              <div className="input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="add-btn-container">
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="pwd-manager-lg-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="pwd-manager-lg"
            />
          </div>
        </div>
        <div className="showing-section">
          <div className="show-section-header">
            <div className="count-search-container">
              <h1 className="pwd">
                Your Passwords{' '}
                <span className="count">{searchedList.length}</span>
              </h1>
              <div className="search-input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="show-pwd-section">
              <div className="show-pwd-container">
                <input type="checkbox" />
                <p className="show-pwd">Show Passwords</p>
              </div>
            </div>
          </div>
          {this.renderPasswordsList()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
