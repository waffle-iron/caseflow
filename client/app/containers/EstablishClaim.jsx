import React, { PropTypes } from 'react';

import RadioField from '../components/RadioField';
import TextField from '../components/TextField';
import TextareaField from '../components/TextareaField';

const CONTESTED_CLAIMS = {
  No: false,
  Yes: true
};

const EMAIL_REGEX = new RegExp([
  '^[-a-z0-9~!$%^&*_=+}{\'?]+(.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_]',
  '[-a-z0-9_]*(.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}.[0-9]{1,3}.[0-9]',
  '{1,3}.[0-9]{1,3}))(:[0-9]{1,5})?$'
].join(''));

export default class EstablishClaim extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state on page render
    this.state = {
      contestedClaims: null,
      emailAddress: '',
      remarks: ''
    };

    this.emailAddressValidationError = this.emailAddressValidationError.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
    this.handleContestedClaimsChange = this.handleContestedClaimsChange.bind(this);
    this.handleRemarksChange = this.handleRemarksChange.bind(this);
  }

  emailAddressValidationError() {
    let { emailAddress } = this.state;

    if (!emailAddress.length) {
      return null;
    }

    if (!EMAIL_REGEX.test(emailAddress)) {
      return 'Not a valid email.';
    }
  }

  handleEmailAddressChange(event) {
    this.setState({
      emailAddress: event.target.value
    });
  }

  handleContestedClaimsChange(event) {
    this.setState({
      contestedClaims: CONTESTED_CLAIMS[event.target.value]
    });
  }

  handleRemarksChange(event) {
    this.setState({
      remarks: event.target.value
    });
  }

  render() {
    let { task } = this.props;
    let { user, appeal } = task;
    let { emailAddress, contestedClaims, remarks } = this.state;

    return (
      <div className="cf-app-segment">
         <h1>Dispatch Show WIP</h1>
         <p>Text rendered by React</p>
         <p>Type: {task.type}</p>
         <p>user: {user.display_name}</p>
         <p>vacols_id: {appeal.vacols_id}</p>
         <form className="cf-form" noValidate>
           <TextField
             label="Email Address"
             name="emailAddress"
             validationError={this.emailAddressValidationError()}
             value={emailAddress}
             onChange={this.handleEmailAddressChange}
           />
           <RadioField
             label="Are contested claims procedures applicable in this case?"
             name="ContestedClaims"
             value={emailAddress}
             onChange={this.handleContestedClaimsChange}
             options={Object.keys(CONTESTED_CLAIMS)}
           />
           {contestedClaims && <TextareaField
             name="Remarks"
             value={remarks}
             onChange={this.handleRemarksChange}
             counter={true}
           />}
           <input type="submit"/>
         </form>
         <h3 style={{ 'marginTop': '25px' }}>Current Values</h3>
         <p>Email Address: {emailAddress}</p>
         <p>Contested Claims: {`${contestedClaims}`}</p>
         <p>Remarks: {remarks}</p>
      </div>
    );
  }
}

EstablishClaim.propTypes = {
  task: PropTypes.object.isRequired
};
