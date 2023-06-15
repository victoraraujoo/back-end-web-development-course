function getDate() {
    let today = new Date();
    const option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("pt-br", option);
    return day;
}