import { createSlice } from "@reduxjs/toolkit";

const proposalSlice = createSlice({
    name:'proposal',
    initialState:{
        freelancers:null,
    },
    reducers:{
        setAllFreelancers:(state,action) => {
            state.freelancers = action.payload;
        }
    }
});
export const {setAllFreelancers} = proposalSlice.actions;
export default proposalSlice.reducer;