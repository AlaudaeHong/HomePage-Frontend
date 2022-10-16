import { Avatar, Box, Container, IconButton, List, ListItem, ListItemAvatar, Paper, styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import React, { ChangeEvent, useState } from "react";

import { FileMeta, removeOneFile, selectAllFilesInSession, selectFileProcessStatus, uploadOneFile } from "./fileSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../auth/authSlice";
import { assembleGetFileUrl } from "./fileHelper";

interface FileExcerptInterface {
  file: FileMeta
}

const FileExcerpt = (input: FileExcerptInterface) => {
  const file = input.file;

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [requestStatus, setRequestStatus] = useState("idle");
  const fileUrl = assembleGetFileUrl(file._id);

  var Authed = false;

  const onRemoveClicked = async () => {
    if (requestStatus === "idle") {
      setRequestStatus("pending");
      await dispatch(removeOneFile(file._id));
    }
  }

  if (user.userId && user.userId !== "") {
    Authed = true;
  }

  return (
    <ListItem secondaryAction={
      <IconButton edge="end" aria-label="delete" onClick={onRemoveClicked} disabled={!Authed}>
        <DeleteIcon />
      </IconButton>
    } key={file._id}>
      <ListItemAvatar>
        <Avatar src={fileUrl} alt={file._id} variant="square" />
      </ListItemAvatar>
    </ListItem>
  )
};

export const FileUploadBox = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const requestStatus = useAppSelector(selectFileProcessStatus);
  const fileInSession = useAppSelector(selectAllFilesInSession);

  const [file, setFile] = useState<File | null>(null);
  const [updateStatus, setUpdateStatus] = useState("idle");

  const fileToUpload = React.useRef();

  var Authed = false;
  let content;

  const onUploadClick = async () => {
    try {
      if (file == null) {
        throw new Error("No File Input");
      }

      setUpdateStatus("pending");

      var formdate = new FormData();
      formdate.append("image", file);
      dispatch(uploadOneFile(formdate));
    } catch (err) {
      console.log(err);
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (e.target.files != null) {
      setFile(e.target.files[0]);
    }
  }

  if (user.userId != null && user.userId !== "") {
    Authed = true;
  }

  if (requestStatus !== "pending") {
    if (updateStatus === "pending") {
      setUpdateStatus("idle");
    }

    content = fileInSession.map((file) => (
      <FileExcerpt key={file._id} file={file} />
    ));
  } else {
    content = <div>Loading...</div>;
  }

  var UploadProp = (
    <ListItem secondaryAction={
      <label htmlFor="upload">
        <input id="upload" type="file" multiple={false} onChange={handleFileChange} />
        <IconButton edge="end" aria-label="upload" onClick={onUploadClick} disabled={!Authed}>
          <AddIcon />
        </IconButton>
      </label>
    } key="file-input">
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
    </ListItem>
  )

  return (
    <Box>
      <Paper sx={{ backgroundColor: "rgba(170, 170, 170, 0.7)" }}>
        {UploadProp}
        <List>
          {content}
        </List>
      </Paper>
    </Box>

  )
}

