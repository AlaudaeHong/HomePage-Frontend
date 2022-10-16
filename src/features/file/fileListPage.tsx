import { Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, IconButton, Link, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../auth/authSlice";
import { assembleGetFileUrl } from "./fileHelper";
import { fetchFileMetas, FileMeta, removeOneFile, selectAllFiles, selectFileProcessStatus } from "./fileSlice";
import { FileUploadBox } from "./fileUpload"
import DeleteIcon from '@mui/icons-material/Delete';
import { bgcolor } from "@mui/system";

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
    <Grid item key={file._id} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'rgba(170, 170, 170, 0.7)' }}>
        <CardMedia component="img" image={fileUrl} alt={file._id} sx={{ maxHeight: "150px" }} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Link href={fileUrl}>{file._id}</Link>
        </CardContent>
        <CardActions>
          <IconButton edge="end" aria-label="delete" onClick={onRemoveClicked} disabled={!Authed}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
};

export const FileListPage = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectAllFiles);
  const fileProcessStatus = useAppSelector(selectFileProcessStatus);

  useEffect(() => {
    if (fileProcessStatus === "idle") {
      dispatch(fetchFileMetas());
    }
  }, [fileProcessStatus, dispatch])

  let content;

  if (fileProcessStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (fileProcessStatus === "succeeded") {
    content = files.map((file) => (
      <FileExcerpt key={file._id} file={file} />
    ));
  } else {
    content = <div>"ERROR"</div>;
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{ margin: 2 }}>
        <Grid item xs={4}>
          <FileUploadBox />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {content}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}