function get() {

    fetch("https://frontendspring20-34e5.restdb.io/rest/celebrities?max=10", {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": "5e957564436377171a0c232c",
                "cache-control": "no-cache"
            }
        })
        .then((e) => e.json())
        .then((e) => console.log(e));
}