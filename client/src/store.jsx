import axios from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import baseURL from "./Api"

export const useStateStore = create(persist(devtools((set, get) => ({
    // STATE ▼
    user: {username: null},
    scene: {},
    sceneTitles: [],
    loading: true,
    loggedIn: false,
    token: '',
    newUser: {
        new: true,
        model: false,
        sound: false
    },

    // REDUCERS ▼
    // when we use set, its like saying:
    // incrementReducer: () => setState((currentState) => ({ specifiedState:is currentState.specified +1}) replaceAll = true or update = false, 'title')

    // method: (inject)
    setUser: (userResponse) => {
        console.log('set user', userResponse);
        // change({your.State: with.Injection})
        set({ user: userResponse }, false, "setUser")
    },
    setLoggedIn: (bool) => {
        console.log('setting presence', bool);
        set({ loggedIn: bool }, false, "setLoggedIn")
    },
    clearUser: () => {
        console.log('Clear user');
        set({ user: {} }, false, "clearUser")
    },
    setLoading: (bool) => {
        console.log('setting loading', bool);
        set({ loading: bool }, false, "setLoading")
    },
    setToken: (tokenResponse) => {
        console.log('setToken', tokenResponse);
        set({ token: tokenResponse }, false, "setToken")
    },
    addTitle: (title) => {
        // change((access.All.Store.States))
        set((state) => { state.sceneTitles.push(title) }, false, "addTitle")
    },
    clearTitles: () => {
        set({ sceneTitles: [] }, false, "clearTitles")
    },
    setScene: (sceneResponse) => {
        console.log('set scene', sceneResponse);
        set({ scene: sceneResponse }, false, "setScene")
    },
    clearScene: () => {
        set({ scene: {} }, false, "clearScene")
    },
    setModelToState: async (modelResponse) => {
        console.log('set model', modelResponse);
        set((state) => { state.scene.model = modelResponse }, false, "setModelToState")

        const scene = get().scene.model;
        const sceneId = get().scene._id;
        const token = get().token
        console.log('sending to DB', scene);
        console.log('sceneId', sceneId);
        const response = await axios.put(
            `${baseURL}/api/scene/${sceneId}/model`,
            scene,
            { headers: { Authorization: token } }
        );
    },
    removeModel: async () => {
        console.log('remove model');
        set((state) => { state.scene.model = {} }, false, "removeModel")

        const scene = {};
        const sceneId = get().scene._id;
        const token = get().token
        console.log('deleting model from DB');
        console.log('sceneId', sceneId);
        const response = await axios.put(
            `${baseURL}/api/scene/${sceneId}/model`,
            scene,
            { headers: { Authorization: token } }
        );
    },
    addTrack: async (newTrack) => {
        console.log('Adding track', newTrack)
        set((state) => { state.scene.tracks.push(newTrack) }, false, "addTrack")
        // something about this needs to change
        // const tracks = { tracks: get().scene.tracks }

        console.log(newTrack)
        const sceneId = get().scene._id;
        const token = get().token
        console.log('Sending new tracks to DB');
        const response = await axios.put(
            `${baseURL}/api/scene/${sceneId}/tracks`,
            newTrack,
            { headers: { Authorization: token } }
        );
        console.log(response.data)
    },
    deleteTrack: async (deleteId) => {
        console.log('Deleting track', deleteId)
        set((state) => ({
            scene: { ...state.scene, tracks: state.scene.tracks.filter((item) => item.id !== deleteId) }
        }), false, "deleteTrack")

        const updatedTracks = get().scene.tracks;
        const sceneId = get().scene._id;
        const token = get().token
        console.log('Sending deleted track to DB');
        const response = await axios.delete(
            `${baseURL}/api/scene/${sceneId}/${deleteId}`,
            { headers: { Authorization: token } }
        );
        console.log(response.data)
    },

    // persistent storage name
})), { name: 'dmv' }));



/*
const userExample = {
    "username": "test",
    "email": "bob@gmail.com",
    "id": "65b6bab86fc7e55f1224c5c8",
    "scenes": [
        {
            "model": {
                "name": "Dragonborn",
                "uid": "308fd9adbde64f96824db889f65e472b",
                "thumbnail": "https://media.sketchfab.com/models/308fd9adbde64f96824db889f65e472b/thumbnails/519d715626a14ad6900a097d56584c27/0f0579204b7c4bbc86e84e5560681ff8.jpeg"
            },
            "_id": "65b6c435e952610fab85db2d",
            "title": "My First Scene",
            "tracks": [
                {
                    "name": "RPG Town Loop #2",
                    "id": 349179,
                    "waveform": "https://cdn.freesound.org/displays/349/349179_5225777_wave_M.png",
                    "preview": "https://cdn.freesound.org/previews/349/349179_5225777-lq.mp3",
                    "_id": "65b6c435e952610fab85db2e"
                },
                {
                    "name": "Dark Cave Background 2.wav",
                    "id": 490585,
                    "waveform": "https://cdn.freesound.org/displays/490/490585_8568126_wave_M.png",
                    "preview": "https://cdn.freesound.org/previews/490/490585_8568126-lq.mp3",
                    "_id": "65b6c435e952610fab85db2f"
                }
            ],
            "user_id": "65b6bab86fc7e55f1224c5c8",
            "createdAt": "2024-01-28T21:16:37.731Z",
            "updatedAt": "2024-01-28T21:16:37.731Z",
            "__v": 0
        },
        {
            "model": {
                "name": "Dragonborn",
                "uid": "308fd9adbde64f96824db889f65e472b",
                "thumbnail": "https://media.sketchfab.com/models/308fd9adbde64f96824db889f65e472b/thumbnails/519d715626a14ad6900a097d56584c27/0f0579204b7c4bbc86e84e5560681ff8.jpeg"
            },
            "_id": "65b6c435e952610fab85db32",
            "title": "My Second Scene",
            "tracks": [
                {
                    "name": "RPG Town Loop #2",
                    "id": 349179,
                    "waveform": "https://cdn.freesound.org/displays/349/349179_5225777_wave_M.png",
                    "preview": "https://cdn.freesound.org/previews/349/349179_5225777-lq.mp3",
                    "_id": "65b6c435e952610fab85db33"
                },
                {
                    "name": "Dark Cave Background 2.wav",
                    "id": 490585,
                    "waveform": "https://cdn.freesound.org/displays/490/490585_8568126_wave_M.png",
                    "preview": "https://cdn.freesound.org/previews/490/490585_8568126-lq.mp3",
                    "_id": "65b6c435e952610fab85db34"
                }
            ],
            "user_id": "65b6bab86fc7e55f1224c5c8",
            "createdAt": "2024-01-28T21:16:37.777Z",
            "updatedAt": "2024-01-28T21:16:37.777Z",
            "__v": 0
        }
    ]
}
*/