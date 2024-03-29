/**
 * Slice para manejar el estado de búsqueda.
 *
 * initialState:
 * Actions:
 *  - searchKeyword: Actualiza el término de búsqueda en el estado.
 */

import { createSlice } from '@reduxjs/toolkit'

const initialState = { search: 'seven' }
export const SearchReducer = createSlice({
  name: 'SearchReducer',
  initialState,
  reducers: {
    searchKeyword: (state, action) => {
      state.search = action.payload
    }
  }
})

export const { searchKeyword } = SearchReducer.actions
