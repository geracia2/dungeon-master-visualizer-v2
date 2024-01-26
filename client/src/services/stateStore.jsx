import { create } from 'zustand';

// when we use set, its like saying:
// incrementReducer: () => setState((currentState) => ({ specifiedState:is currentState.specified +1}))
const store = (set) => ({
    tracks: [{ name: null, id: null, waveform: null, preview: null }], // state
    model: {
        name: null,
        uid: null,
    },
    addTrack: ({ name, id, waveform, preview }) =>
        set((store) => ({ tracks: [...store.tracks, { name, id, waveform, preview }] })),
    deleteTrack: ({ name, id, waveform, preview }) =>
        set((store) => ({
            tracks: store.tracks.filter((track) => track.id !== id)
        }),
});

export const useStateStore = create(store)

/*

// usage
import { useStore } from 'zustand';
// function App(){
const state = useStore((store) => store.namedState) // grabs the entire state

*/