export const getDate = (dateString: string) => {
    const date = new Date(Date.parse(dateString));
    const day = date.getDay().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};


export const showDate = (dateString: string) => {
    const date = new Date(Date.parse(dateString));
    const day = date.getDate();
    const month = (date.getMonth());
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

export const stringToColor = (string: string) => {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
};

export const stringAvatar = (name: string) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
            color: "white",
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
};