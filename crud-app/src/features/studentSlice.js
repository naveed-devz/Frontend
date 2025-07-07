import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    students:[],
}

const studentSlice = createSlice({
    name:"students",
    initialState,
    reducers:{
        addStudent:(state, action)=>{
            state.students.push(action.payload);
        },
        editStudent:(state, action)=>{
            const {id, updateStudent} = action.payload;
            const index = state.students.findIndex(student => student.id === id);
            if(index !== -1){
                state.students[index] = updateStudent
            }
        },
        deleteStudent:(state,action)=>{
            state.students =   state.students.filter(student => student.id !== action.payload);
            
        }
    }
})


export const {addStudent, editStudent, deleteStudent} = studentSlice.actions;
export default studentSlice.reducer;