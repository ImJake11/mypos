import { useDispatch } from "react-redux";
import { openToas } from "../../redux/slice/toastSlice";
import ToasEnum from "../../enum/toastEnum";
import { error } from "console";
import { resolve } from "path";

interface GenerateImageOptions {
    file: File | Blob,
    onSuccess?: (dataUrl: string) => void,
    onError?: (error: string) => void,
    dispatch?: ReturnType<typeof useDispatch>
}

export const generateImageStringUrl = ({
    file, onSuccess, onError, dispatch
}: GenerateImageOptions): Promise<string> => {

    return new Promise((resolve, reject) => {

        if (!file) {

            const errorMessage = 'No file provided';

            if (dispatch) {
                dispatch(openToas({
                    message: errorMessage,
                    type: ToasEnum.ERROR,
                }));
            }

            if (onError) onError(errorMessage);
            reject(errorMessage);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            const result = fileReader.result as string;
            if (onSuccess) onSuccess(result)
            resolve(result);
        }


        fileReader.onerror = () => {
            const errorMessage = "Unable to load image provided";
            if (onError) onError(errorMessage);
            reject(errorMessage);

        }

        fileReader.readAsDataURL(file);

    })
}