import { FirebaseDB } from "../../firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { fileUpload, loadNotes } from "../../helpers";
import {
  addNewEmptyNote,
  setActiveNotes,
  savingNewNote,
  setNotes,
  setSaving,
  updatedNote,
  setPhotosToActiveNote,
  deleteNoteById,
  setPhotoIdToActiveNote,
} from "./journalSlice";
import { deleteImgs } from "../../helpers/deleteImgs";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
      imageIds:[],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNotes(newNote));
    //dispatch ( newNote )
    //dispatch ( activar )
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error("El id del usuario no existe");

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    // Lo que hago aca es eliminar el id de la nota activa ya que no lo necesito almacenar en firestore
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updatedNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    //await fileUpload(files[0]);

    // Para subir todas las imagenes de forma simultanea, creo un arreglo de promesas con las siguientes lineas de codigo
    const fileUploadPromises = [];
    const idImages = [];
    
    for (const file of files) {
      const { secure_url, public_id } = await fileUpload(file);

      fileUploadPromises.push( secure_url );
      idImages.push( public_id )

    }

    console.log(idImages)
    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
    dispatch(setPhotoIdToActiveNote(idImages));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    const {  active: note } = getState().journal;
    //Con las siguientes dos lineas borramos la note de firestore
    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
    await deleteDoc( docRef );

    //Con la siguiente linea borramos la nota del store
    dispatch( deleteNoteById( note.id ));
  }
}

export const startDeletingImages = () => {

  return async ( dispatch, getState ) => {

    const {  active: note } = getState().journal;

    for ( const imgId of note.imageIds ) {

      await deleteImgs( imgId )

    }
  }
}