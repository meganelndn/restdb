const endpoint = "https://frontendspring20-34e5.restdb.io/rest/celebrities";
const apiKey = "5e957564436377171a0c232c";

window.addEventListener("load", (e) => {
    document.querySelector("button.add-new").addEventListener("click", () => {
        const data = {
            name: "Mégane",
            alias: "Megsipegsi",
            dob: "1998-06-03",
            albums: 0,
            exes: ["Orlando Bloom", "Johnny Depp"]
        };
        post(data);
    });
});

function get() {
    document.querySelector("main").innerHTML = "";

    fetch(endpoint + "?max=10", {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": apiKey,
                "cache-control": "no-cache"
            }
        })
        .then((e) => e.json())
        .then(showCelebrities);
}
get();

function showCelebrities(data) {
    data.forEach(showCeleb);
}

function showCeleb(celebrity) {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    const parent = document.querySelector("main");

    copy.querySelector("h1").textContent = celebrity.name;
    copy.querySelector("h2").textContent = "Also known as: " + celebrity.alias;

    const ul = copy.querySelector("ul");
    celebrity.exes.forEach((ex) => {
        const li = document.createElement("li");
        li.textContent = ex;
        ul.appendChild(li)
    })
    parent.appendChild(copy);
}

function post(data) {

    // OPTIMISTIC INSERTS
    //showCeleb(data);

    const postData = JSON.stringify(data);
    fetch(endpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": apiKey,
                "cache-control": "no-cache"
            },
            body: postData,
        })
        .then((res) => res.json())
        .then((data) => showCeleb(data));
}