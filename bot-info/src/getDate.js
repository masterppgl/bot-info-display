export default function (date) {
    const vDate = new Date(date);
    return (
        `${vDate.getHours()}:${vDate.getMinutes()}:${vDate.getSeconds()} ` +
        vDate.getDate() +
        "th " +
        vDate.toLocaleString("default", { month: "long" }) +
        "," +
        vDate.getFullYear()
    );
}
