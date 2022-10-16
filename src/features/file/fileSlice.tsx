import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk, RootState } from "../../store/store"

export interface FileMeta {
  _id: string
}

interface FileState {
  files: FileMeta[],
  currentFile: string,
  fileInSession: FileMeta[]
  status: string,
  error: string
}

const initialState: FileState = {
  files: [],
  currentFile: "",
  fileInSession: [],
  status: "idle",
  error: ""
}

export const fetchFileMetas = createAsyncThunk("files/list", async () => {
  const response = await fetch("/api/public");
  const data = await response.json();
  return data;
})

export const uploadOneFile = createAsyncThunk("files/uploadfile", async (formdata: FormData) => {
  const response = await fetch("/api/public/upload", {
    method: "POST",
    body: formdata,
  });

  const data = await response.json();
  return data;
})

export const removeOneFile = createAsyncThunk("files/removefile", async (fid: string) => {
  const response = await fetch("/api/public/" + fid, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
})

const FileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFileMetas.pending, (state, action) => {
        state.status = "loading";
        state.files = [];
      })
      .addCase(fetchFileMetas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.files = action.payload;
      })
      .addCase(uploadOneFile.pending, (state, action) => {
        state.status = "pending";
        state.currentFile = "";
      })
      .addCase(uploadOneFile.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentFile = action.payload;
        state.fileInSession = state.fileInSession.concat(action.payload);
      })
      .addCase(removeOneFile.pending, (state, action) => {
        state.status = "pending";
        state.currentFile = "";
      })
      .addCase(removeOneFile.fulfilled, (state, action) => {
        state.status = "idle";
        state.files = [];

        state.fileInSession = state.fileInSession.filter(
          (file) => file._id !== action.payload._id
        )
      })
  },
})

export const selectAllFiles = (state:RootState) => state.files.files;
export const selectAllFilesInSession = (state:RootState) => state.files.fileInSession;
export const selectFileProcessStatus = (state:RootState) => state.files.status;

export default FileSlice.reducer;