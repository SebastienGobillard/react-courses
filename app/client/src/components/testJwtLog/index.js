import React from 'react';
import { getJwt } from '../helpers/jwt';
import axios from 'axios';
import { IconGroup } from 'semantic-ui-react';
import { whithRouter } from 'react-router-dom';

class JwtLog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
        console.log('history protégé', this.props.history)
    }

componentDidMount() {
    const history = this.props
     const jwt = getJwt()
     console.log('dans le cdm', this.props.history)
     if(!jwt) {
         console.log('pas de jwt')
         this.props.history.push('/login');
     }
     axios.get('http://www.o-courses.eu/api/user/getUser/', { headers: { Authorization: `Bearer ${jwt}` } })
            .then(res => res.setState( {
                user: res.data
            })).catch(err => {
                localStorage.removeItem('cool-jwt');
                this.props.history.push('/login');
            })
}

render() {
    
    if( this.state.user === undefined) {
        return (
            <div>Loding...</div>
        );
    }
    return (
        <div> {this.props.children}</div>
    )
}

}

export default whithRouter(JwtLog);