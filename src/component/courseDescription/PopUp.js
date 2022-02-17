import React, { Component } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom'

export default class PopUp extends Component {
    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    render() {
        return (
            <Modal
                open={true}
                onClose={this.props.toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={this.style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        登录之后再写课评吧！
                    </Typography>
                    <NavLink to="/login">
                        <Button>我觉得可以</Button>
                    </NavLink>
                    <NavLink to="/survey">
                        <Button>还是算了</Button>
                    </NavLink>
                </Box>
            </Modal>
        );
    }
}