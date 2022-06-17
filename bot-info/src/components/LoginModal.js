import { useState } from "react";
import { FormControl, InputGroup, Modal , Button} from "react-bootstrap";

export default function ({show, setShow}){
    const [password, setPassword] = useState("")
    const onClickLogin = () => {
        if(password === "isfYNQaWlyRsIJOCqtFf"){
            setShow(false)
        }
    }
    return (
        <Modal show = {show}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">
                            Password
                        </InputGroup.Text>

                        <FormControl
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={onClickLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}