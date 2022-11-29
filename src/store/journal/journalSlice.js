import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    //    active: {
    //        id: 'ABC123',
    //        title: '',
    //        body: '',
    //        date: 123456,
    //        imageUrls: []
    //    }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNotes: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
      //TODO: Mensaje de error...
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updatedNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      console.log(action.payload);
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    deleteNoteById: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNotes,
  setNotes,
  setSaving,
  updatedNote,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote,
} = journalSlice.actions;
