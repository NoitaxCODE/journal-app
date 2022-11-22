import { FirebaseDB } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNotes, savingNewNote, setNotes, setSaving, updatedNote } from "./journalSlice";

export const startNewNote = () => {

  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
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

    dispatch( setNotes( notes ));
  };
};

export const startSaveNote = ()=>{
  return async (dispatch, getState) => {

    dispatch( setSaving() )

    const { uid } = getState().auth;
    const { active:note } = getState().journal;
    
    const noteToFireStore = { ...note };
    // Lo que hago aca es eliminar el id de la nota activa ya que no lo necesito almacenar en firestore
    delete noteToFireStore.id;

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
    await setDoc( docRef, noteToFireStore, { merge: true } );

    dispatch( updatedNote( note ) )

  }
}
