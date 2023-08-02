let filter = document.querySelector(".filter")
let options = document.querySelectorAll(".options")
let selectField = document.querySelector(".selectField")
let list = document.querySelector(".list")
let flag = document.querySelector(".flag")
let country = document.querySelector(".country")
let locate = document.querySelector(".location")
let population = document.querySelector(".population")
let capital = document.querySelector(".capital");
let datas=[];

// adding dark-theme
let icon = document.querySelector("#icon");
icon.onclick = function(){
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-them")) {
                document.querySelector(".mode").textContent = "ligth mode";
        } else {
                
        }
        // icon.src= "<i class="fa-regular fa-sun"></i>";
        
}

selectField.onclick = function(){
        list.classList.toggle("hide")
}
options.onclick = function(){
        list.classList.toggle("hide")
}


let numberOfOptions = options.length

for(let i = 0; i<numberOfOptions; i++){
     document.querySelectorAll(".options")[i].addEventListener("click",function(){
        
        let buttonInnerhtml = this.textContent;
        handleFilter(buttonInnerhtml)
        list.classList.toggle("hide")
    }
    );
}

function handleFilter(word){
        filter.textContent = word;

}

let search = document.querySelector(".search")
search.addEventListener("keyup", (event) =>{
     if(event.key== "Enter"){
        let countryName = search.value
        searchCountry(countryName)
     } 
})
function searchCountry(name){
        if(name==''){
                fetch(`https://restcountries.com/v3.1/name/rwanda`)
                .then(resp => resp.json())
                .then(data => dataElt(data))
        }else{
                fetch(`https://restcountries.com/v3.1/name/${name}`)
                .then(resp => resp.json())
                .then(data => dataElt(data))
        }
            
}

function dataElt(data){
        console.log(datas)
        country.textContent = data[0].name.common
        flag.src=data[0].flags.svg
        population.textContent = `Population: ${data[0].population}`
        locate.textContent = `Region: ${data[0].continents[0]}`
        capital.textContent = `Capital: ${data[0].capital[0]}`
}
 

// function to display all the countries on homepage
const urlCountries = 'https://restcountries.com/v3.1/all';
function fetchCountries() {
        fetch(urlCountries)
        .then(res => res.json())
        .then((response) => {
               let output = '';
               response.forEach(function (country){
                output += 
                '<div class="box">'+
                   '<img src="'+country.flags.svg+'" alt="" class="flag">'+
                   '<div class="description">'+
                       '<h5 class="country">'+country.name.common+'</h3>'+
                       '<h6 class="population">Population: '+country.population+'</h6>'+
                      '<h6 class="location">Region: '+country.continents+'</h6>'+
                       '<h6 class="capital">Capital: '+country.capital+'</h6>'+
                   '</div>'+
                '</div>'
               });
               document.getElementById('list_countries').innerHTML = output; 
        });
}