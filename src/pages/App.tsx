import { useEffect, useState } from 'react';

import CardComponent from '../components/CardComponent'

import { Button, Card, Icon, Input, Menu, Modal, Transition,  } from 'semantic-ui-react'


import styles from '../styles/app.module.css'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

import { destroySession } from '../store/reducers/userSlice';

interface taskInterface {
    _id: Object,
    task: string,
    user: string,
    status: number,
    createdAt: Date,
    updatedAt: Date
}

function App() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [filter, setFilter] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const addTask = async () => {
        setLoad(true);
        
        const values = {
            'task': newTask,
            'user': user.userLog,
            'status': 1
        }

        const response = await fetch("http://187.133.208.125:8082/newTask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values })
        });

        const res = await response.json()

        if(res.ok) {
            setNewTask('');
            setLoad(false);
        } else {
            setMessage(res.mensaje)
            setShow(true);
        }
    }

    const logout = () => {
        dispatch(destroySession());
        navigate('/login')
    }

    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch("http://187.133.208.125:8082/getTasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "user": user.userLog })
            });
    
            const res = await response.json()
    
            if(res.ok) {
                setTasks(res.tasks)
            } else {
                setMessage(res.mensaje)
                setShow(true);
            }
        }

        if(!user.login) {
            navigate('/login')
        }

        getTasks();
    })


  return (
    <div className={styles.main}>
        <Modal 
            size="mini"
            open={show}
        >
            <h4>{message}</h4>
            <Modal.Actions>
                <Button onClick={() => setShow(false)}>
                    Cerrar
                </Button>
            </Modal.Actions>
        </Modal>
        <Menu 
            attached='top'
            borderless
        >
            <Menu.Item>
                <Input 
                    type='text'
                    placeholder='Nueva Tarea'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    action
                >
                    <input />
                    <Button loading={load} onClick={() => addTask()}>
                        <Icon name='add' />
                    </Button>
                </Input>
            </Menu.Item>
            
            <Menu.Item>
                <Button
                    toggle
                    active={filter === 1 ? true : false}
                    onClick={() => setFilter(1)}
                >
                    Activos
                </Button>
            </Menu.Item>
            
            {/*<Menu.Item>
                <Button
                    toggle
                    active={filter === 2 ? true : false}
                    onClick={() => setFilter(2)}
                >
                    Vencidos
                </Button>
            </Menu.Item>*/}
            
            <Menu.Item>
                <Button
                    toggle
                    active={filter === 3 ? true : false}
                    onClick={() => setFilter(3)}
                >
                    Completados
                </Button>
            </Menu.Item>
            
            <Transition visible={filter !== 0} animation='scale' duration={500}>
                <Menu.Item>
                    <Button
                        color='pink'
                        onClick={() => setFilter(0)}
                    >
                            <Icon name='close' />Filtros
                    </Button>
                </Menu.Item>
            </Transition>
            
            <Menu.Item position='right'>
                <Button 
                    animated
                    floated='right'
                    color='pink'
                    onClick={() => logout()}
                >
                    <Button.Content visible>
                        <Icon name='sign out' />
                    </Button.Content>
                    <Button.Content hidden>Salir</Button.Content>
                </Button>
            </Menu.Item>
        </Menu>

        <div className={styles.body}>
            <Card.Group itemsPerRow={3}>
                {
                    filter === 0 ?
                        tasks.map((task : taskInterface) => (
                            <CardComponent key={task.task} taskDef={task}/>
                        )) 
                        :
                        tasks.map((task : taskInterface) => (
                            task.status === filter ?
                                <CardComponent key={task.task} taskDef={task}/>
                                : null
                        )) 
                }
            </Card.Group>
        </div>
    </div>
  )
}

export default App
