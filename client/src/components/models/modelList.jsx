import {
    Box,
    Typography,
    Modal,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Chip,
    Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useState } from "react";
import { useStateStore } from '../../store';

export default function ModelList({ modelData }) {
    const [modalInfo, setModalInfo] = useState({});
    const setModelToState = useStateStore((store) => store.setModelToState)
    const removeModelState = useStateStore((store) => store.removeModelState)

    // modal vars
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //modal style
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70vw",
        height: "80vh",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    //modal interactions
    const handleModalSelect = (uid, name, thumbnail) => {
        handleOpen();
        setModalInfo({
            uid: uid,
            name: name,
            thumbnail: thumbnail,
        });
        console.log(uid, name);
    };

    return (
        <>
            {modelData ? (<>
                <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
                    <ImageList>
                        {modelData.map((model, i) => (
                            <ImageListItem key={model.uid}>
                                <img
                                    src={model.thumbnails.images[0].url}
                                    alt={model.name}
                                    loading="lazy"
                                    style={{
                                        maxWidth: "600px",
                                        minWidth: "0",
                                    }}
                                    onClick={() => handleModalSelect(model.uid, model.name, model.thumbnails.images[2].url)}
                                />
                                <ImageListItemBar
                                    title={model.name}
                                    subtitle={<span>by: {model.user.username}</span>}
                                    position="bottom"
                                    actionIcon={
                                        <Stack
                                            direction="column"
                                            spacing={1}
                                            sx={{
                                                position: "relative",
                                                right: "10px",
                                            }}
                                        >
                                            <Chip
                                                label="Add to Scene"
                                                onClick={() => setModelToState({
                                                    uid: model.uid,
                                                    name: model.name,
                                                    thumbnail: model.thumbnails.images[2].url
                                                })}
                                                icon={<AddIcon />}
                                            />
                                        </Stack>
                                    }
                                    actionPosition="right"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modalInfo.name}
                            </Typography>
                            <iframe
                                src={`https://sketchfab.com/models/${modalInfo.uid}/embed`}
                                id="api-frame"
                                allow="autoplay; fullscreen; xr-spatial-tracking"
                                xr-spatial-tracking="true"
                                execution-while-out-of-viewport="true"
                                execution-while-not-rendered="true"
                                web-share="true"
                                mozallowfullscreen="true"
                                webkitallowfullscreen="true"
                                accelerometer="true"
                                // resize stuff:
                                width="100%"
                                height="95%"
                                // class="fop"
                                frameBorder="0"
                            />
                        </Box>
                    </Modal>
                </Box>
            </>
            ) : (
                <>
                    <Typography variant="caption" color="text.disabled" sx={{ display: "flex", justifyContent: "center" }}>
                        [ Your party is waiting on you... again. ]
                    </Typography>
                </>
            )}
        </>
    );
}
