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
 
// function dataElt(data){
//         //console.log(data);
//         datas.push(data[0].name.common);
//         datas.push(data[0].population);
//         datas.push(data[0].continents[0]);
//         datas.push(data[0].capital[0]);
//         console.log(datas)
// // datas.map((item)=> item.classList.add('grey'));
// datas.forEach((item) =>{
//         item.classList.add('grey');
// })
//         country.textContent = datas[0]
//         flag.src=data[0].flags.svg
//         population.textContent = `Population: ${datas[1]}`
//         locate.textContent = `Region: ${datas[2]}`
//         capital.textContent = `Capital: ${datas[3]}`        
// }