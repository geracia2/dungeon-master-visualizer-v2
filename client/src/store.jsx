import { create } from "zustand";
import { devtools } from "zustand/middleware";
// when we use set, its like saying:
// incrementReducer: () => setState((currentState) => ({ specifiedState:is currentState.specified +1}) replaceAll or update true/false, 'title')
export const useStateStore = create(devtools((set) => ({
    user: {},
    scenes: [],
    loading: true,
    newUser: {
        new: true,
        model: false,
        sound: false
    },
    // reducers
    setUser: (response) => {
        console.log('set user', response);
        set({ user: response }, false, "setUser")
    },
    setLoading: (bool) => {
        console.log('setting loading', bool);
        set({ loading: bool })
    }


})));

// use devtools middleware with chrome extension to observer state changes
/*

// usage
import { useStore } from 'zustand';
// function App(){
const state = useStore((store) => store.namedState) // grabs the entire state

*/
