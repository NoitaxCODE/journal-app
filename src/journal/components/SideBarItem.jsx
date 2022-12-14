import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from 'react';
import { menuClick, setActiveNotes } from "../../store/journal/journalSlice";
import { useDispatch } from "react-redux";


export const SideBarItem = ({ title='', body, date, id, imageUrls=[], imageIds=[] })=>{

    const newTitle = useMemo( ()=> {
        return title.length > 17 ? title.substring(0,17) + '...' : title
    },[ title ])

    const dispatch = useDispatch();

    const onClickNotes = () => {
      dispatch( setActiveNotes({ title, body, id, date, imageUrls, imageIds }) )
      dispatch( menuClick() )
    }

    return(
        <ListItem disablePadding >
              <ListItemButton onClick={ onClickNotes }>
                <ListItemIcon>
                  <TurnedInNot/>
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={ newTitle } />
                  <ListItemText secondary={ body }/>
                </Grid>
              </ListItemButton>
        </ListItem>
    )
}