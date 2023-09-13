
/*
fetch("https://puzzle.mead.io/puzzle").then( (response) => {
    response.json().then((data) => {
        console.log(data.puzzle)
    })
})
*/


const form =  document.querySelector("form")
const search =  document.querySelector("input[name='address']")


const message1 =  document.querySelector("#msg1")
const message2 =  document.querySelector("#msg2")


form.addEventListener("submit" , (ev) => {
    ev.preventDefault()
    
    const address =search.value

    message1.textContent='loading ...';
    message2.textContent='';


    fetch(`/weather?address=${address}`).then((response) => {

        response.json().then( data => {
    
            if(data.Error) {

               // console.log(data.Error)
                message1.textContent = data.Error
                message2.textContent = ""
                
            }else{

               // console.log(data.location)
               // console.log(data.forecast)
               message1.textContent= data.location;
               message2.textContent = data.forecast;

            }
    
        })
    })

})