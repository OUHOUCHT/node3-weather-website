const axios =  require("axios")



const forecast = (lat,lon , callback)  => {

axios.get('http://api.weatherapi.com/v1/current.json' ,{
    params  : {
        key : "e7cc4560ed1b437da0e120953230709",
        q: `${lat},${lon}`
    }
}).then(
    ({data}) => {

        const  {current : {condition : {text}}} = data
        const  {current : {temp_c ,humidity} } =   data;
        
        callback(undefined ,` data clear troughout the day . it is currently ${temp_c} degrees out . 
        It feels like ${text} The humidity is ${humidity} % `)
    }
).catch( ({cause}) => {
    
    callback(cause , undefined)

})

}


module.exports = {forecast}