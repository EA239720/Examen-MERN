import { Button, Modal } from "semantic-ui-react";

function AlertComponent( Message: string, show : boolean, setShow: (arg0: boolean) => void ) {
    <Modal
        size="mini"
        open={show}
    >
        <h4>{ Message }</h4>
        <Modal.Actions>
            <Button onClick={() => setShow(false)}>
                Cerrar
            </Button>
        </Modal.Actions>
    </Modal>
}

export default AlertComponent;