

export const useFormatDateOnly = (isoString: string): string => {

    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

    return formattedDate;
};

export const useFormatTime = (isoString: string) => {

    const date = new Date(isoString);

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return formattedTime;

}