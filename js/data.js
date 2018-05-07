const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

window.onload = func;
function func(){
    for (let i = 0; i < countries.length; i++){
        let item = document.createElement("div");
        item.setAttribute("class", "item");

        let countryName = document.createElement("h2");
        countryName.innerText = countries[i].name;
        let continent = document.createElement("p");
        continent.innerText = countries[i].continent;

        let innerBox1 = document.createElement("div");
        innerBox1.setAttribute("class", "inner-box");
        let cityName = document.createElement("h3");
        cityName.innerText = "Cities";
        innerBox1.appendChild(cityName);
        let ul = document.createElement("ul");
        for (var j in countries[i].cities){
            let li = document.createElement("li");
            li.innerText = countries[i].cities[j];
            ul.appendChild(li);
        }
        innerBox1.appendChild(ul);

        let innerBox2 = document.createElement("div");
        innerBox2.setAttribute("class", "inner-box");
        let popularPhoto = document.createElement("h3");
        popularPhoto.innerText = "Popular Photos";
        innerBox2.appendChild(popularPhoto);
        for (var m in countries[i].photos){
            let img = document.createElement("img");
            img.setAttribute("class", "photo");
            img.setAttribute("src", "images/" + countries[i].photos[m]);
            innerBox2.appendChild(img);
        }

        let button = document.createElement("button");
        button.innerText = "visit";

        item.appendChild(countryName);
        item.appendChild(continent);
        item.appendChild(innerBox1);
        item.appendChild(innerBox2);
        item.appendChild(button);
        document.getElementsByClassName("flex-container justify")[0].appendChild(item);
    }
}

