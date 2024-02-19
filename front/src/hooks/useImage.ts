import { ChangeEvent, useState } from "react";

export default function useImage(currentImage: string | null) {
    const [image, setImage] = useState<string | ArrayBuffer | null>(
        currentImage
    );

    const handleSetImage = async (
        event: ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
    ) => {
        if ("target" in event && event.target instanceof HTMLInputElement) {
            const reader = new FileReader();
            const inputElement = event.target as HTMLInputElement;
            if (inputElement.files && inputElement.files[0]) {
                const isJpeg = inputElement.files[0].type.slice(-4) === "jpeg";
                const isJpg = inputElement.files[0].type.slice(-3) === "jpg";
                const isPng = inputElement.files[0].type.slice(-3) === "png";

                if (isJpeg || isJpg || isPng) {
                    reader.addEventListener("load", () => {
                        const result = reader.result;
                        if (result) {
                            setImage(reader.result);
                        }
                    });
                    reader.readAsDataURL(inputElement.files[0]);
                }
            }
        } else {
            setImage(null);
        }
    };

    return { image, handleSetImage };
}
