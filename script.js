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
        .then(showCelebrities);
}

function showCelebrities(data) {
    data.forEach(showCeleb);
}

function showCeleb(celebrity) {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    const parent = document.querySelector("main");

    copy.querySelector("h1").textContent = celebrity.name;
    copy.querySelector("h2").textContent = celebrity.alias;

    const ul = copy.querySelector("ul");
    celebrity.exes.forEach((ex) => {
        const li = document.createElement("li");
        li.textContent = ex;
        ul.appendChild(li)
    })
    parent.appendChild(copy);
}

get();