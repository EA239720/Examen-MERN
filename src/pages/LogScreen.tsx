
import 'semantic-ui-css/semantic.min.css'
import { Form, Button, Icon, Input, Message } from "semantic-ui-react";

import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { useAppDispatch } from '../store/hooks';

import { startSession } from '../store/reducers/userSlice';

import styles from '../styles/login.module.css'


function LogScreen() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [showPass, setShowPass] = useState('password');
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('')

    const dispatch = useAppDispatch();

    const login = async (e : React.FormEvent<HTMLFormElement>) => {
        setLoad(true);
        setAlert(false);
        setMessage('');
        e.preventDefault();
        
        const form = e.target as HTMLFormElement;

        const values = {
            "user": form.usuario.value,
            "pass": form.contrasena.value
        }

        const response = await fetch("https://examen-mern-api-production.up.railway.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values })
        });

        const res = await response.json();

        if(res.ok) {
            dispatch(startSession({ "userLog": res.user, "login": true}));
            navigate('/');
        } else {
            setMessage(res.mensaje);
            setAlert(res.ok);
        }

        form.reset()

        setLoad(false);
    }

    return (
        <div className={styles.main}>
            <h3>Acceder</h3>
            <Form 
                className={styles.form}
                onSubmit={login}
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
                        labelPosition='left corner'
                        placeholder='Usuario'
                        name='usuario'
                    />
                </Form.Field>
                <Form.Field>
                    <Input
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
                    animated
                    floated='right'
                    color='pink'
                    loading={load}
                >
                    <Button.Content visible>
                        <Icon name='sign in' />
                    </Button.Content>
                    <Button.Content hidden>Entrar</Button.Content>
                </Button>
                <h5><Link to="/register">Registrarse</Link></h5>
            </Form>
        </div>
    );
}

export default LogScreen;