import {create} from 'zustand';

const store = (set) => ({
    // count: 0, // state
    // increment: () => set((state) => ({ count: state.count + 1 })), //reducers
    // decrement: () => set((state) => ({ count: state.count - 1 })),
    // deleteTask: (title) => ({
    //     task: store.tasks.filter((task) => task.title !== title)
    // })
});

export const useStateStore = create(store)