import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name:"project",
    initialState:{
        allProjects:[],
        allClientProjects:[],
        singleProject:null, 
        searchProjectByText:"",
        allSubmittedProposals:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllProjects:(state,action) => {
            state.allProjects = action.payload;
        },
        setSingleProject:(state,action) => {
            state.singleProject = action.payload;
        },
        setAllClientProjects:(state,action) => {
            state.allClientProjects = action.payload;
        },
        setSearchProjectByText:(state,action) => {
            state.searchProjectByText = action.payload;
        },
        setAllSubmittedProposals:(state,action) => {
            state.allSubmittedProposals = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllProjects, 
    setSingleProject, 
    setAllClientProjects,
    setSearchProjectByText, 
    setAllSubmittedProposals,
    setSearchedQuery
} = projectSlice.actions;
export default projectSlice.reducer;