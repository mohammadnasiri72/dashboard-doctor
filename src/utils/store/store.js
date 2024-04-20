import { configureStore } from '@reduxjs/toolkit'
import doctorNameRducer from './sliceDoctor/DoctorName'

export const store = configureStore({
  reducer: {
    doctorName : doctorNameRducer,
  },
})