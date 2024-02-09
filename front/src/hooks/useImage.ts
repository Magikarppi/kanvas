import { ChangeEvent, useState } from "react";

export default function useImage(currentImage: string | null) {
    const [image, setImage] = useState<string | ArrayBuffer | null>(
        currentImage
    );

    const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            const isJpeg = event.target.files[0].type.slice(-4) === "jpeg";
            const isJpg = event.target.files[0].type.slice(-3) === "jpg";
            const isPng = event.target.files[0].type.slice(-3) === "png";

            if (isJpeg || isJpg || isPng) {
                reader.addEventListener("load", () => {
                    const result = reader.result;
                    if (result) {
                        console.log(typeof reader.result);
                        setImage(reader.result);
                    }
                });
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    };

    return { image, handleSetImage };
}
