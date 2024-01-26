import { create } from "zustand";
import { devtools } from "zustand/middleware";
// when we use set, its like saying:
// incrementReducer: () => setState((currentState) => ({ specifiedState:is currentState.specified +1}) replaceAll or update true/false, 'title')
const store = (set) => ({
    // state
    user: {

    },
    scenes: [
        {
            _id: { "$oid": "65b3f41401804c024c69673f" },
            title: "My First Scene",
            model: {
                "name": "Dragonborn",
                "uid": "783b685da9bf457d81e829fa283f3567"
            },
            tracks: [
                {
                    name: "RPG Town Loop #2",
                    id: 349179,
                    waveform: "https://cdn.freesound.org/displays/349/349179_5225777_wave_L.png",
                    preview: "https://cdn.freesound.org/previews/349/349179_5225777-lq.mp3",
                    _id: { "$oid": "65b3f41401804c024c696740" }
                }
            ],
            user_id: { $oid: "65b3e88c14b43af032b27b67" }
        },
    ],

    // reducers
    addScene: (title, user_id, _id)

    addTrack: ({ name, _id, waveform, preview }) =>
        set(
            (store) => ({
                tracks: [...store.tracks, { name, id, waveform, preview }],
            }),
            true,
            "addTrack"
        ),

    deleteTrack: ({ name, id, waveform, preview }) =>
        set(
            (store) => ({
                tracks: store.tracks.filter((track) => track.id !== id),
            }),
            true,
            "deleteTrack"
        ),
});

export const useStateStore = create(devtools(store));
// use devtools middleware with chrome extension to observer state changes
/*

// usage
import { useStore } from 'zustand';
// function App(){
const state = useStore((store) => store.namedState) // grabs the entire state

*/
