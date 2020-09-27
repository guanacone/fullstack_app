import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import useInput from '../hooks/useInput';
import url from '../url';

const UserForm = () => {
  const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput('');
  const { value: familyName, bind: bindFamilyName, reset: resetFamilyName } = useInput('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post(`${url}/api/user`, {
      firstName: `${firstName}`,
      familyName: `${familyName}`,
    })
      .then((response) => {
        const id = response.data._id;
        navigate(`/user/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
    resetFirstName();
    resetFamilyName();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" {...bindFirstName} />
      </label>
      <label>
        Last Name:
        <input type="text" {...bindFamilyName} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserForm;

// export default class IndexPage extends React.Component {
//   state = {
//     firstName: '',
//     familyName: '',
//   }

//   handleInputChange = (event) => {
//     const { target } = event;
//     const { value } = target;
//     const { name } = target;

//     this.setState({
//       [name]: value,
//     });
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post(`${url}/api/user`, {
//       firstName: `${this.state.firstName}`,
//       familyName: `${this.state.familyName}`,
//     })
//       .then((response) => {
//         const id = response.data._id;
//         navigate(`/user/${id}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   render() {
//     console.log(`logging: ${this.state.firstName}`);
//     return (
//       <div>
//         <form
//       name="contact"
//       method="post"
//       action="/thanks/"
//       onSubmit={this.handleSubmit}>
//           <input type="hidden" name="form-name" value="contact" />
//           <label>
//             First name
//             <input
//             type="text"
//             name="firstName"
//             value={this.state.firstName}
//             onChange={this.handleInputChange}
//           />
//           </label>
//           <label>
//             Family name
//             <input
//             type="text"
//             name="familyName"
//             value={this.state.familyName}
//             onChange={this.handleInputChange}
//           />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }
