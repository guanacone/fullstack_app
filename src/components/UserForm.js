import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import url from '../url';

export default class IndexPage extends React.Component {
  state = {
    firstName: '',
    familyName: '',
  }

  handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${url}/api/user`, {
      firstName: `${this.state.firstName}`,
      familyName: `${this.state.familyName}`,
    })
      .then((response) => {
        const id = response.data._id;
        navigate(`/user/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form
      name="contact"
      method="post"
      action="/thanks/"
      onSubmit={this.handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <label>
          First name
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Family name
          <input
            type="text"
            name="familyName"
            value={this.state.familyName}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
