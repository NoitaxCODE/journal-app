import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    menuOpen: false,
    //    active: {
    //        id: 'ABC123',
    //        title: '',
    //        body: '',
    //        date: 123456,
    //        imageUrls: [],
    //        imageIds: [],
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
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    setPhotoIdToActiveNote: (state, action) => {
      state.active.imageIds = [...state.active.imageIds, ...action.payload];
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;

    },
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter( note => note.id !== action.payload )
      state.active = null
    },
    menuClick: (state) => {
      state.menuOpen = !state.menuOpen
    }
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
  setPhotoIdToActiveNote,
  menuClick,
  clearNotesLogout,
} = journalSlice.actions;
