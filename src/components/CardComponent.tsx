import { Button, Card, Icon, Modal } from "semantic-ui-react";

import styles from '../styles/components.module.css'
import formatDate from "../functions/FormatDate";
import { useState } from "react";


function CardComponent({ task }) {
    const [load, setLoad] = useState(false);

    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    const completeTask = async () => {
        setLoad(true);
        
        const response = await fetch("http://localhost:3001/updateTask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "task": task._id, "status": 3 })
        });

        const res = await response.json()

        if(!res.ok) {
            setMessage(res.mensaje)
            setShow(true);
        }
        
        setLoad(false);
    }

    return(
        <>
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
            <Card
                color={
                    task.status === 1 ? "green" 
                        : task.status === 2 ? "red"
                            :"pink"
                }
            >
                <Card.Content className={styles.card}>
                    <Card.Header content={task.task} />
                    <Card.Meta>
                        {formatDate(task.createdAt)}
                    </Card.Meta>
                    <Card.Description>
                        {
                            task.status === 1 ? "ACTIVA" 
                            : task.status === 2 ? "VENCIDA"
                                :"COMPLETADA"
                        }
                    </Card.Description>
                    {
                        task.status !==3 ?
                            <Button 
                                color="green" 
                                loading={load}
                                onClick={() => completeTask()}
                            >
                                <Icon name='check square' />
                                Completar
                            </Button>
                            : null
                    }
                </Card.Content>
            </Card>
        </>
    )
}

export default CardComponent;