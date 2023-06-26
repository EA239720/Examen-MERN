
import 'semantic-ui-css/semantic.min.css'
import { Form, Button, Icon, Input, Message } from "semantic-ui-react";

import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/login.module.css'


function RegScreen() {
    const [load, setLoad] = useState(false);
    const [showPass, setShowPass] = useState('password');
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('')

    const register = async (e : React.FormEvent<HTMLFormElement>) => {
        setLoad(true);
        setAlert(false);
        setMessage('');
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const values = {
            "user": form.usuario.value,
            "pass": form.contrasena.value
        };

        const response = await fetch("http://187.233.56.23:8082/newUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values })
        });

        const res = await response.json();

        setMessage(res.mensaje);
        setAlert(res.ok);

        form.reset()

        setLoad(false);
    }

    return (
        <div className={styles.main}>
            <h3>Registrarse</h3>
            <Form 
                className={styles.form}
                onSubmit={register}
            >
                <Message 
                    hidden={message === ''}
                    visible={message !== ''}
                    positive={alert}
                    negative={!alert}
                    compact
                >
                    { message }
                </Message>
                <Form.Field>
                    <Input 
                        label={{ icon: 'asterisk' }}
                        labelPosition='left corner'
                        placeholder='Usuario'
                        name='usuario'
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        label={{ icon: 'asterisk' }}
                        labelPosition='left corner'
                        type={showPass}
                        placeholder='Contraseña'
                        name='contrasena'
                        icon={
                            showPass === 'password' ?
                                <Icon name='eye' link onClick={() => setShowPass('text')} />
                                : <Icon name='eye slash' link  onClick={() => setShowPass('password')}/>
                        }
                    />
                </Form.Field>
                <Button 
                    floated='right'
                    color='pink'
                    loading={load}
                >
                        <Icon name='signup' />Registrarse
                </Button>
                <Link to='/login'>
                    <Button 
                        animated
                        floated='left'
                        color='pink'
                        loading={load}
                    >
                        <Button.Content visible>
                            <Icon name='arrow left' />
                        </Button.Content>
                        <Button.Content hidden>Regresar</Button.Content>
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default RegScreen;