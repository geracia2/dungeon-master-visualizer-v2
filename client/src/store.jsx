import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
// when we use set, its like saying:
// incrementReducer: () => setState((currentState) => ({ specifiedState:is currentState.specified +1}) replaceAll or update true/false, 'title')
export const useStateStore = create(persist(devtools((set) => ({
    // STATE ▼
    user: {},
    scene: {
        // title: "test Scne",
        // user_id: "test",
        // model: {
        //     name: "test",
        //     uid: "test",
        //     thumbnail: "test"
        // },
        // _id: "test",
        // tracks: [
        //     {
        //         name: "test",
        //         id: 349179,
        //         waveform: "test",
        //         preview: "test",
        //         _id: "test"
        //     },
        // ],
        // createdAt: "2024-01-28T21:16:37.731Z",
        // updatedAt: "2024-01-28T21:16:37.731Z",
        // __v: 0,
    },
    sceneTitles: [],
    loading: true,
    // newUser: {
    //     new: true,
    //     model: false,
    //     sound: false
    // },

    // REDUCERS ▼

    // method: (inject)
    setUser: (userResponse) => {
        console.log('set user', userResponse);
        // change({your.State: with.Injection})
        set({ user: userResponse }, false, "setUser")
    },

    setLoading: (bool) => {
        console.log('setting loading', bool);
        set({ loading: bool }, false, "setLoading")
    },

    addTitle: (title) => {
        set((state) => {
            state.sceneTitles.push(title)
        }, false, "addTitle")
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

    setModel: (modelResponse) => {
        console.log('set model', modelResponse);
        set({
            scene: {
                model: { modelResponse },
                title: state.scene.title,
                tracks: state.scene.tracks,
            }
        }, false, "setModel")
    },

    removeModel: () => {
        console.log('remove model');
        set((state) => ({
            scene: {
                model: {},
                title: state.scene.title,
                tracks: state.scene.tracks,
            }
        }), false, "removeModel")
    },

    addTrack: (newTrack) => {
        console.log('Adding track', newTrack)
        // change((access.All.Store.States))
        set((state) => {
            state.scene.tracks.push(newTrack)
        }, false, "addTrack")
    },

    deleteTrack: (deleteId) => {
        console.log('Deleting track', deleteId)
        set((state) => ({
            scene: {
                model: state.scene.model,
                title: state.scene.title,
                tracks: state.scene.tracks.filter((item) => item.id !== deleteId)
            }
        }), false, "deleteTrack")
    },


})), 
// persistent storage name
{ name: 'dmv' }));



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