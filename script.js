const endpoint = "https://frontendspring20-34e5.restdb.io/rest/countries";
const apiKey = "5e957564436377171a0c232c";

window.addEventListener("load", (e) => {
    document.querySelector("button.add-new").addEventListener("click", () => {
        const data = {
            country: "My country",
            area: "5555",
            language: "German",
            three_biggest_cities: ["Montevideo", "Brussels", "Malmö"]
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
        .then(showCountries);
}
get();

function showCountries(data) {
    data.forEach(showCountry);
}

function showCountry(country) {
    console.log(country)

    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    const parent = document.querySelector("main");

    copy.querySelector("article").dataset.id = country._id;
    copy.querySelector("h1").textContent = country.country;
    copy.querySelector("h2").textContent = country.area;
    const ul = copy.querySelector("ul");
    country.three_biggest_cities.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city;
        ul.appendChild(li)
    });

    copy.querySelector("button.delete-me").addEventListener("click", () => deleteIt(country._id));
    parent.appendChild(copy);
}

function post(data) {
    // OPTIMISTIC INSERTS below
    // showCountry(data);

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
        .then((data) => showCountry(data));
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
        country: "France",
        area: "567378",
        language: "French",
        three_biggest_cities: ["same", "other", "another"]
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
            copy.querySelector("h1").textContent = data.country;
            copy.querySelector("h2").textContent = data.area;
            const ul = copy.querySelector("ul");
            data.three_biggest_cities.forEach((city) => {
                const li = document.createElement("li");
                li.textContent = city;
                ul.appendChild(li)
            });
        });
}