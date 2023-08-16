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
        fetchRegion(buttonInnerhtml)
        list.classList.toggle("hide")
    }
    );
}
function handleFilter(word){
        filter.textContent = word;
}

// function of filtering region and displaying them
function fetchRegion(region){
        fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(resp => resp.json())
        .then(data => {
            let output = "";
            data.forEach(country => {
                output += '<div class="box">'+
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


// input field
// adding eventlistener to the input field
let search = document.querySelector(".search")
search.addEventListener("keyup", (event) =>{
     if(event.key== "Enter"){
        let countryName = search.value
        searchCountry(countryName)
     } 
})
function searchCountry(name){
        if(name==''){
                alert("please enter the country")
        }else{
                fetch(`https://restcountries.com/v3.1/name/${name}`)
                .then(resp => resp.json())
                .then(data => dataElt(data))
        }
            
}

function dataElt(data){
        console.log(data)
                output = '<div class="box" onclick = "singleCountry(&quot;'+data[0].name.common+'&quot)">'+
                    '<img src="'+data[0].flags.svg+'" alt="" class="flag">'+
                    '<div class="description">'+
                      '<h5 class="country">'+data[0].name.common+'</h3>'+
                      '<h6 class="population">Population: '+data[0].population+'</h6>'+
                      '<h6 class="location">Region: '+data[0].continents+'</h6>'+
                      '<h6 class="capital">Capital: '+data[0].capital+'</h6>'+
                    '</div>'+
                  '</div>'

                  document.getElementById('list_countries').innerHTML = output;

}
 

// function to display all the countries on homepage
const urlCountries = 'https://restcountries.com/v3.1/all';
function fetchCountries() {
        fetch(urlCountries)
        .then(res => res.json())
        .then((response) => {
               let output = '';
               response.forEach(function (country){
                
                output += '<div class="box" onclick = "singleCountry(&quot;'+country.name.common+'&quot)">'+
                '<img src="'+country.flags.svg+'" alt="" class="flag">'+
                '<div class="description">'+
                    '<h5 class="country">'+country.name.common+'</h3>'+
                    '<h6 class="population">Population: '+country.population+'</h6>'+
                   '<h6 class="location">Region: '+country.continents+'</h6>'+
                    '<h6 class="capital">Capital: '+country.capital+'</h6>'+
                '</div>'+
            '</div>'

               });
               document.getElementById('list_countries').innerHTML = output;        });
      
}

// eventListener on boxes

let countryFlag = document.querySelector(".box")

function singleCountry(singleName){
        
        window.location.href = "./country.html?name="+singleName;
        }
function oneCountry(){
                const queryString = window.location.search;
                const urlParam = new URLSearchParams(queryString);
                const name = urlParam.get("name");
                fetch(`https://restcountries.com/v3.1/name/${name}`)
                .then(resp => resp.json())
                .then(data => {
                        console.log(data[0])
                        let output = '<div class="country_flag">'+
                       '<img class="country_flag" src="'+data[0].flags.svg+'" alt="">'+
                    '</div>'+
        
                   
                    '<div class="mg10 country_details1">'+
                        '<h2 class="p10 country_name">'+data[0].name.common+'</h2>'+
                        '<h5 class="mg5 native_name">Native Name: ' +data[0].name.official+'</h5>'+
                        '<h5 class="mg5 country_population">Population: '+data[0].population+'</h5>'+
                        '<h5 class="mg5 country_location">Region: '+data[0].region+'</h5>'+
                        '<h5 class="mg5 country_subRegion">Sub Region: '+data[0].subregion+'</h5>'+
                        '<h5 class="mg5 country_capital">Capital: '+data[0].capital[0]+'</h5>'+
                    '</div>'+
                        
                    '<div class="mg10 country_details2">'+
                        '<h5 class="mg5 mg7 top_level_domain">Top Level Domain: '+data[0].tld[0]+'</h5>'+
                        '<h5 class="mg5 country_currencies">Currencies: ';
                       
                        for (const key in data[0].currencies) {
                                output += '<span>'+data[0].currencies[key].name+', </span>';
                                 
                         }
                        output += '</h5>'+
                        '<h5 class="mg5 country_languages">Languages: ';
                        for (const key in data[0].languages) {
                               output += '<span>'+data[0].languages[key]+', </span>';
                                
                        }
                        output += '</h5>'+
                    '</div>'+
                        
                    '<div class="mg10 border_countries">'+
                        '<h5 class="borders">Border Countries:</h5>';
                        if(data[0].borders){

                                data[0].borders.forEach(function(border, index){
                                        if(index > 2){
                                                return;
                                        } 
                                        output += '<button class="btn btn_3">'+border+'</button>';
                                       
                                        
                                })
                        }
                       output += '</div>';
                    document.getElementById('viewSingleCountry').innerHTML = output;
                })
                
}