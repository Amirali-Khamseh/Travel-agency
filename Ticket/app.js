let form  = document.querySelector('.form-data');
let submit =document.querySelector('.submit');

//Date values
let departureDate = document.querySelector('#departure-date')
let returnDate =  document.querySelector('#return-date')
let oneWay = document.querySelector('#oneway');
let roundTrip = document.querySelector('#round-trip');

let returnDateLable =  document.querySelector('#return-date-label')
/*Origin Dom elements */
let origin_result = document.querySelector('#from_country');
let next_button = document.querySelector('#next_city')
let origin_city = document.querySelector('#from_city');
let label_city = document.querySelector('#city_label_origin');
/*Destination Dom elements*/
let des_result = document.querySelector('#des_country')
let des_next_button = document.querySelector('#des_next_city')
let des_origin_city = document.querySelector('#des_city');
let des_label_city = document.querySelector('#city_label_des');


let resultContries = '';
let resultCities = '';
let currentCountry = null;
let currentCountryDes = null;

const BASE_URL = 'https://countriesnow.space/api/v0.1/countries';

/*Getting Countries from API */
let getCountries = async () => {
 const response = await fetch(`${BASE_URL}`).then(response => response.json())
  const { data } = response;

  data.forEach((item) => {
    resultContries +=
    `
     <option value='${item.country}'> ${item.country}</option>
    `;
   })
  origin_result.innerHTML = resultContries;
  des_result.innerHTML = resultContries;
 
}
getCountries();

/*Getting Cities based on the selected country */
next_button.addEventListener('click',(e)=>{
  e.preventDefault();
  currentCountry = origin_result.value;
  getCities(currentCountry)
  label_city.style.display = 'block';
}) 

let getCities = async (country) => {
    const response = await fetch(`${BASE_URL}`).then(response => response.json())
     const { data } = response;
    resultCities = ''
     data.forEach((item) => {
       if(country === item.country){
           for(let i =0 ;i<item.cities.length;i++){
             resultCities +=`<option value=${item.cities[i]}>${item.cities[i]}</option>`;
            
           }
          
        }
     })
     
     origin_city.innerHTML =resultCities;
   
   }
    

   /* Destination */
des_next_button.addEventListener('click',(e)=>{
  e.preventDefault();
  currentCountryDes = des_result.value;
  getCitiesDes(currentCountryDes)
  des_label_city.style.display = 'block';
})


let getCitiesDes = async (country) => {
  const response = await fetch(`${BASE_URL}`).then(response => response.json())
   const { data } = response;
  resultCities = ''
   data.forEach((item) => {
     if(country === item.country){
         for(let i =0 ;i<item.cities.length;i++){
           resultCities +=`<option value=${item.cities[i]}>${item.cities[i]}</option>`;
          
         }
        
      }
   })
   
   des_origin_city.innerHTML =resultCities;
 
 }

//one-way flight 
oneWay.addEventListener('click',(e)=>{
  e.preventDefault();
      returnDate.style.display = 'none';
      returnDateLable.style.display='none';
  

})
roundTrip.addEventListener('click',(e)=>{
  e.preventDefault();
  returnDate.style.display = 'block';
  returnDateLable.style.display='block';
})


   
/*Form submission event*/
form.addEventListener('submit',(e)=>{
  let data ;
    e.preventDefault();
    if(origin_result.value === '' || origin_city.value === '' ||des_result.vale ==='' ||des_origin_city.vale === '' ){
      submit.disabled = true;  
      alert('Some fields are empty !!! 😪');
    }else{
         data = {
          from : origin_result.value,
          origin_city : origin_city.value ,
          destination :des_result.value,
          destination_city :des_origin_city.value,
          desparture_date: departureDate.value,
          return_date:returnDate.value
         }
    }
 console.log(data)

})