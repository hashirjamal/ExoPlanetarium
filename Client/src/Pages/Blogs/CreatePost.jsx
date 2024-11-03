import React, { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Alert from "@mui/material/Alert";
import {
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoCloudUpload } from "react-icons/io5";
import { useState } from "react";
import { app } from "./../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../store/userContext.jsx";
import Forbidden from "../Forbidden/Forbidden.jsx";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CreatePost() {
    const {user} = useContext(UserContext);
    
    if (user?.role !== "admin") {
        return <Forbidden />
    }

    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setForm] = useState({});
    const [ImageFileUploadProgress, setImageFileUploadProgress] =
        useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [publishError, setPublishError] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [dataSuccess, setDataSuccess] = useState(false);
    const [category, setCategory] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setPublishError(false);
      setDataSuccess(false);
      setDataLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/post/create-post",
        {
          ...formData,
          userId: "12343",
        }
      );
      setDataLoading(false);
      setDataSuccess(true);
      setPublishError(null);
      navigate(`/post/${res?.data?.post?.slug}`);
    } catch (err) {
      setDataLoading(false);
      setPublishError(
        err.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  // function to handle the the image saving process in firebase
  const handleUploadImage = async () => {
    try {
      setImageFileUploadError(null);
      setImageFileUploading(true);
      if (!file) {
        setImageFileUploadError("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (err) => {
          setImageFileUploadError("Image upload failed");
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
          setFile(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadImageUrl) => {
            setImageUrl(downloadImageUrl);
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
            setImageFileUploading(false);
            setForm({
              ...formData,
              imageUrl: downloadImageUrl,
            });
          });
        }
      );
    } catch (err) {
      setImageFileUploadError("Image Upload failed");
      setImageFileUploadProgress(null);
    }
  };
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.id]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

    return (
        <>
            <div className="bg-[url('./create-bg.gif')] bg-cover w-full min-h-screen pb-5">
                <div className="p-3 min-h-screen mx-auto max-w-4xl px-4">
                    <h1 className="text-center text-4xl font-bold my-7 dark:text-gray-200">
                        Create Post
                    </h1>
                    <form
                        className="text-center flex flex-col gap-4"
                        onSubmit={handleSubmitForm}
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-4 color-white">
                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "white",
                                    },
                                }}
                                id="title"
                                label="Title"
                                variant="outlined"
                                onChange={handleChange}
                                className="w-full flex flex-1 dark:text-white"
                                required
                            />
                            <FormControl
                                className="w-full md:w-48"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },

                                    "& .MuiInputLabel-root": {
                                        color: "white",
                                    },
                                }}
                            >
                                <InputLabel id="demo-simple-select-label">
                                    Select a category
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name="category"
                                    label="Select a category"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <MenuItem value="exoplanets">
                                        Exoplanets
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            onChange={handleChange}
                            className="w-full flex flex-1"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "white",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                    },
                                },
                                "&:hover fieldset": {
                                    borderColor: "white",
                                },
                                "& .MuiInputLabel-root": {
                                    color: "white",
                                },
                            }}
                            required
                        />
                        <div className="flex items-center p-5 border-2 border-dashed justify-between">
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<IoCloudUpload />}
                                className="bg-gradient-to-r h-12 from-[#81b0bd] to-[#095b85]"
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(e) => {
                                        setFile(e.target.files[0]);
                                        setImageFileUploadError(null);
                                    }}
                                    multiple
                                />
                            </Button>
                            <Button
                                onClick={handleUploadImage}
                                type="button"
                                variant="outlined"
                                className="w-40 h-12"
                                sx={{
                                    color: "white",
                                    outlineColor: "#81b0bd",
                                    borderColor: "#81b0bd",
                                }}
                                disabled={ImageFileUploadProgress}
                            >
                                {ImageFileUploadProgress ? (
                                    <div className="w-8 h-8">
                                        <CircularProgressbar
                                            value={ImageFileUploadProgress}
                                            text={`${
                                                ImageFileUploadProgress || 0
                                            } %`}
                                        />
                                    </div>
                                ) : (
                                    "Upload Image"
                                )}
                            </Button>
                        </div>
                        {imageFileUploadError && (
                            <Alert severity="error">
                                {imageFileUploadError}
                            </Alert>
                        )}
                        {formData.imageUrl && (
                            <img
                                src={formData.imageUrl}
                                alt="upload"
                                className="object-cover w-full h-72"
                            />
                        )}
                        <ReactQuill
                            className="h-72 mb-14 dark:text-white"
                            theme="snow"
                            placeholder="Write Something..."
                            onChange={(value) => {
                                setForm({ ...formData, content: value });
                            }}
                        />

            <Button
              variant="contained"
              type="submit"
              disableElevation
              className="bg-gradient-to-r h-12 from-[#81b0bd] to-[#095b85]"
            >
              {dataLoading && (
                <CircularProgress
                  color="inherit"
                  size="25px"
                  className="mr-3 "
                />
              )}
              Publish
            </Button>
            {publishError && (
              <Alert severity="error" className="mt-4">
                {publishError}
              </Alert>
            )}
            {dataSuccess && (
              <Alert severity="success" className="mt-2">
                Post Successfully Published!
              </Alert>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
