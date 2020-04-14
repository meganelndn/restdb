const endpoint = "https://frontendspring20-34e5.restdb.io/rest/celebrities";
const apiKey = "5e957564436377171a0c232c";

window.addEventListener("load", (e) => {
    document.querySelector("button.add-new").addEventListener("click", () => {
        const data = {
            name: "Mégane",
            alias: "Megs" + Math.random(),
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
    console.log(celebrity)

    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    const parent = document.querySelector("main");

    copy.querySelector("article").dataset.id = celebrity._id;
    copy.querySelector("h1").textContent = celebrity.name;
    copy.querySelector("h2").textContent = "Also known as: " + celebrity.alias;
    const ul = copy.querySelector("ul");
    celebrity.exes.forEach((ex) => {
        const li = document.createElement("li");
        li.textContent = ex;
        ul.appendChild(li)
    });

    copy.querySelector("button.delete-me").addEventListener("click", () => deleteIt(celebrity._id));
    parent.appendChild(copy);
}

function post(data) {
    // OPTIMISTIC INSERTS below
    // showCeleb(data);

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

function deleteIt(id) {

    document.querySelector(`article[data-id="${id}"]`).remove()

    fetch(`${endpoint}/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": apiKey,
                "cache-control": "no-cache"
            }
        })
        .then((res) => res.json())
        .then((data) => console.log(data));
}

function put(id) {

    let data = {
        name: "Mégane3",
        alias: "Megs3" + Math.random(),
        dob: "1998-06-01",
        albums: 0,
        exes: ["Me", "You"]
    }

    let postData = JSON.stringify(data);

    fetch(`${endpoint}/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": apiKey,
                "cache-control": "no-cache"
            },
            body: postData
        })
        .then((d) => d.json())
        .then((data) => {
            const copy = document.querySelector(`article[data-id="${id}"]`)
            copy.querySelector("h1").textContent = data.name;
            copy.querySelector("h2").textContent = "Also known as: " + data.alias;
            const ul = copy.querySelector("ul");
            data.exes.forEach((ex) => {
                const li = document.createElement("li");
                li.textContent = ex;
                ul.appendChild(li)
            });
        });
}