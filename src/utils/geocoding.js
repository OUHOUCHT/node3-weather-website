const axios =  require("axios")



const geoCoding =  async (city = "rabat",callback) => {
 
 /***  First method using  async function */  
    // axios ( {
    //     method :"get",
    //     url :`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?limit=1&access_token=pk.eyJ1IjoiY2NjMTk5OCIsImEiOiJjbG05YmYxdGkwZ2syM2RvNXNscmd4N3RzIn0.bOVKj6plNTjur-OI9WFlQQ`,
    //     responseType : "json"
    // }).then( (response) => {
    
    //     if(response.data.features.length ===0){
    //         console.log("unable to find location .Try another serach.")
    //     }else {
    //         const  latitude=response.data.features[0].center[0] ;
    //         const  longitude=response.data.features[0].center[1] ;
    //         console.log(latitude,longitude)
    //     }
    
    // }).catch( () =>{
    //     console.log("unable to connect to location services!")
    // }).finally(() => {
    //     console.log('operation fin')
    // });

/***  Second method using await inside async function */  

    try {
        
            const {data} =  await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?limit=1&access_token=pk.eyJ1IjoiY2NjMTk5OCIsImEiOiJjbG05YmYxdGkwZ2syM2RvNXNscmd4N3RzIn0.bOVKj6plNTjur-OI9WFlQQ`)
           
            const {features : [ content]  } = data;
           
            if( !content ){
                callback("unable to find location .Try another serach.",undefined) // undefined --> geoCoding(address,(error,{latitude ,longitude ,location}  ={ }) => {...} or {} --> geoCoding(address,(error,{latitude ,longitude ,location} ) => {...} 
            }else {

                const [longitude ,latitude ] = content.center;
                const location = content.place_name;
                
                callback(undefined,{latitude ,longitude ,location})
            }

           

    } catch (error) {
        callback("unable to connect to location services!")

    }

} 


module.exports = {geoCoding};