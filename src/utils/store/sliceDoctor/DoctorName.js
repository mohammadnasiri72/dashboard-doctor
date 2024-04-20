import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: {},
}

export const doctorNameSlice = createSlice({
    name: 'doctorName',
    initialState,
    reducers: {
        changDoctotName: (state, action) => {
            state.name = action.payload
        },
    },
})

export const { changDoctotName } = doctorNameSlice.actions

export default doctorNameSlice.reducer