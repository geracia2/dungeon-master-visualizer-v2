import { create } from "zustand";
import { devtools } from "zustand/middleware";
// when we use set, its like saying:
// incrementReducer: () => setState((currentState) => ({ specifiedState:is currentState.specified +1}) replaceAll or update true/false, 'title')
export const useStateStore = create(devtools((set) => ({
    user: null,
    scenes: [],
    loading: false,
    newUser: {
        new: true,
        model: false,
        sound: false
    },
    // reducers
    setUser: (response) => {
        console.log('setting');
        set({ user: response }, false, "setUser")
    },
    // clearUser: () => {
    //     console.log('clearing');
    //     set({ user: {} }, false, "clearUser");
    //     set({loading: true})
    // },


})));

// use devtools middleware with chrome extension to observer state changes
/*

// usage
import { useStore } from 'zustand';
// function App(){
const state = useStore((store) => store.namedState) // grabs the entire state

*/
