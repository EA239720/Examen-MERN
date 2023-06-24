import { Button, Card, Icon, Modal } from "semantic-ui-react";

import styles from '../styles/components.module.css'
import formatDate from "../functions/FormatDate";
import { useState } from "react";

interface taskInterface {
    _id: Object,
    task: string,
    user: string,
    status: number,
    createdAt: Date,
    updatedAt: Date
}

interface CardProps {
    taskDef: taskInterface
}


function CardComponent(props: CardProps) : JSX.Element {
    const { taskDef } = props

    const [load, setLoad] = useState(false);

    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    const completeTask = async () => {
        setLoad(true);
        
        const response = await fetch("http://187.133.208.125:8082/updateTask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "task": taskDef._id, "status": 3 })
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
                    taskDef.status === 1 ? "green" 
                        : taskDef.status === 2 ? "red"
                            :"pink"
                }
            >
                <Card.Content className={styles.card}>
                    <Card.Header content={taskDef.task} />
                    <Card.Meta>
                        {formatDate(taskDef.createdAt)}
                    </Card.Meta>
                    <Card.Description>
                        {
                            taskDef.status === 1 ? "ACTIVA" 
                            : taskDef.status === 2 ? "VENCIDA"
                                :"COMPLETADA"
                        }
                    </Card.Description>
                    {
                        taskDef.status !==3 ?
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