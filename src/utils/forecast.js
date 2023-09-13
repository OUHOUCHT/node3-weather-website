const axios =  require("axios")



const forecast = (lat,lon , callback)  => {

axios.get('http://api.weatherapi.com/v1/current.json' ,{
    params  : {
        key : "e7cc4560ed1b437da0e120953230709",
        q: `${lat},${lon}`
    }
}).then(
    ({data :{ current : {temp_c}}}) => {
        callback(undefined ,` data clear troughout the day . it is currently ${temp_c} degrees out . `)
    }
).catch( ({cause}) => {
    
    callback(cause , undefined)

})

}


module.exports = {forecast}