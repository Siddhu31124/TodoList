import {createSlice,configureStore} from "@reduxjs/toolkit"

const storeSlice=createSlice({
    name:'TodoStore',
    initialState:{todos:[]},
    reducers:{
        onAddTodo(state,action){
            console.log("hai")
            state.todos.push(action.payload)
            console.log(state.todos)
        },
        onDeleteTodo(state,action){
            state.todos=state.todos.filter((each)=>action.payload !==each.id)
        }
    }
})
const store=configureStore({
    reducer:storeSlice.reducer
})
export const todoAction=storeSlice.actions
export default store 