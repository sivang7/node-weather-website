console.log('app.js (client side javascript) loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

fetchWeatherByLocation = (location) => {
    fetch('/weather?address='+location).then((response)=> {
        response.json().then((data)=> {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })  
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = "Loading ...";
    messageTwo.textContent = "";

    const location = search.value;
    if(location){
        fetchWeatherByLocation(location);
    }
    else {
        messageOne.textContent = "Please insert location";
    }
})