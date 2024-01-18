const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
    GET_ALL_FOLDERS_API: BASE_URL + "/get-all-folders",
    GET_ALL_FILES_API: BASE_URL + "/get-all-files",
    RENAME_FILE_API: BASE_URL + "/rename-file",
    DELETE_FILE_API: BASE_URL + "/delete-file",
    RENAME_FOLDER_API: BASE_URL + "/rename-folder",
    DELETE_FOLDER_API: BASE_URL + "/delete-folder",
    CREATE_FOLDER_API: BASE_URL + "/create-folder",
    UPLOAD_FILE_API: BASE_URL + "/upload-file",
    MOVE_FILE_API: BASE_URL + "/move-file",
}