import React, { PureComponent } from 'react';
// import ContentComponent from '../../components/ContentComponent';
import styles from './LoginScreen.module.scss';

export default class LoginScreen extends PureComponent {

    state = {};

    render() {
        return (
            <div className={styles.container}>
                <h1>Login Screen</h1>
            </div>
        );
    }

}
