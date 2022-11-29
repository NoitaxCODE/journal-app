import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNotes, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import Swal from "sweetalert2";

export const NoteView = () => {
  const dispatch = useDispatch();
  // Con la sintaxis active:note lo que hago es renombrar la constante active por note
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNotes(formState));
  }, [formState]);

  useEffect(() => {
    if (!!messageSaved) {
      Swal.fire({
        title: "Guardado!",
        text: `${messageSaved}`,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    console.log("Subiendo archivos...");
    dispatch(startUploadingFiles(target.files));
  };

  const fileInputRef = useRef();

  const onDelete = ()=> {
    dispatch( startDeletingNote() );
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio en el dia de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline/>
          Borrar
        </Button>
      </Grid>

      {/* Puedo pasarles las imagenes como props a el componente, o tambien puedo consumirlas desde el store dentro del componenrte */}
      <ImageGallery images={ note.imageUrls } />
    </Grid>
  );
};
