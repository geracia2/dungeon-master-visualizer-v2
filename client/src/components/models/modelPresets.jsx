import React from "react";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function ModelPresets({setModelData}) {
    // Preset API requests
    async function handlePreset(param) {
        // const url = `https://api.sketchfab.com/v3/models?q=${params}&count=${count}&cursor=${cursor}&restricted=false`;
        const url = `https://api.sketchfab.com/v3/search?q=${param}`;
        try {
            const response = await axios.get(url);
            const results = response.data.results.models;
            console.log('Result from model api request',results);
            setModelData(results);
        } catch (error) {
            console.warn(error);
        }
    }
    return (
        <>
            <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            
                <ButtonGroup color="secondary" size="small" aria-label="asdf">
                    <Button onClick={() => handlePreset("DragonBorn")}>DragonBorn</Button>
                    <Button onClick={() => handlePreset("Elf")}>Elf</Button>
                    <Button onClick={() => handlePreset("Gnome")}>Gnome</Button>
                    <Button onClick={() => handlePreset("Goblin")}>Goblin</Button>
                </ButtonGroup>
            </Box>
        </>
    );
}
