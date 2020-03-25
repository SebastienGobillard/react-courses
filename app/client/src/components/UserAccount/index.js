import React from 'react';
import './style.scss';
import './../App/App.css';
import FormUser from 'src/components/FormUser';

class UserAccount extends React.Component {
    state = {
        step: 1,
        firstname: '',
        lastName: '',
        email: '',
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setstate({
            step: step + 1
        });
    }

    // Go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setstate({
            step: step + 1
        });
    }

    // Handle fields change
    handleChange = input => event => {
        this.setState({[input]: event.target.value})
        console.log(event.target.value);
    }

    render() {
        const { step } = this.state;
        const {firstName, lastName, email} = this.state;
        const values = {firstName, lastName, email}

        switch(step) {
            
            case 1:
                return (
                   <FormUser 
                    nextStep={this.state}
                    handleChange={this.handleChange}
                    values={values}
                   /> 
                )
                case 2:
                    return <h1>Exemple</h1>
                case 3 :
                return <h1>Confirm</h1>
                case 4 :
                return <h1>Success</h1>
            
        }
    }
}

export default UserAccount;




