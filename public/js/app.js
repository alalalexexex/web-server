// client 
console.log('client file is loaded!'); 

const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne'); 
const messageTwo = document.querySelector('#messageTwo'); 

// search.addEventListener('keydown', (e) => {
//     const key = e.key; 
//     if(key == 'Backspace' || key == 'Delete'){
//         const newMsg = messageOne.textContent.substring(0, messageOne.textContent.length - 1);
//         messageOne.textContent = newMsg; 
//         return; 
//     }else if(key.length > 1){
//         return; 
//     }
//     messageOne.textContent += e.key; 
// }); 

weatherForm.addEventListener('submit', (e) => {
    messageTwo.textContent = ""; 
    messageOne.textContent = "";    
    // submit forms default will refresh entire browser. Not what we want qthough.
    e.preventDefault(); 

    // the browser automatically encodes the URI component
    const location = search.value; 
    if(!location) return console.log('Must provide an address'); 

    messageOne.textContent = 'Loading...'; 
    fetch('http://localhost:8081/weather?address='+location).then((response) => {
        // it is resonse.error because we set up the body to send back an error property if something didn't work. 
        response.json().then((data) => {
            if(data.err){
                return messageOne.textContent = data.err;    
            }
            
            messageOne.textContent = data.location; 
            messageTwo.textContent = data.forecast; 
        }); 
    }); 
}); 