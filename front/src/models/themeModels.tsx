import { Dispatch, SetStateAction } from "react";

export type TOpen = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};
