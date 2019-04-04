import React, { PureComponent } from 'react';
// import ContentComponent from '../../components/ContentComponent';
import styles from './LoginScreen.module.scss';
// import image from '../../assets/bg.jpg';

import { Input } from 'antd';

export default class LoginScreen extends PureComponent {

    state = {};

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <Input placeholder="CPF" />
                    <Input placeholder="Senha" type="password" />
                </div>
            </div>
        );
    }

}
