import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name:"client",
    initialState:{
        singleClient:null,
        clients:[],
        searchClientByText:"",
    },
    reducers:{
        // actions
        setSingleClient:(state,action) => {
            state.singleClient = action.payload;
        },
        setClients:(state,action) => {
            state.clients = action.payload;
        },
        setSearchClientByText:(state,action) => {
            state.searchClientByText = action.payload;
        }
    }
});
export const {setSingleClient, setClients,setSearchClientByText} = clientSlice.actions;
export default clientSlice.reducer;