const path =  require("path")
const express = require("express");
const hbs =  require("hbs")

const  {geoCoding} =  require("./utils/geocoding")
const  {forecast} =  require("./utils/forecast")

//console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname,"../public"))


const port = process.env.PORT  || 3000
const app =  express();
const publicDirectoryPath = path.join(__dirname,"../public");
const partialsPath =  path.join(__dirname,"../templates/partials")

// Les fichiers statiques, dans le contexte d'Express font référence aux fichiers préexistants tels que les images, les fichiers CSS, les fichiers JavaScript, les feuilles de style, les polices, etc qui ne sont pas générés dynamiquement par le serveur.
// le répertoire "C:\Users\MOHAMMED\Documents\node-js-files\web-server\public" contient les fichiers statiques que nous souhaitons servir.
// Avantages : Servir des fichiers statiques à l'aide d'Express est un moyen efficace de fournir des ressources comme des images ou des fichiers CSS à vos pages Web. Cela améliore les performances en permettant aux navigateurs de mettre en cache ces fichiers, réduisant ainsi la charge sur le serveur.


app.set('views', path.join(__dirname,"../templates"));


app.set("view engine","hbs");
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))



/** The res.render() function is used to render a view and sends the rendered HTML string to the client */
// res.render(view [, locals] [, callback])
//Locals: It is basically an object whose properties define local variables for the view.
//Callback It is a callback function.

app.get('/' , (req,res) => {

    res.render("index" ,{
        name : "mohammed",
        title : "index ",

    } )
})

app.get("/weather" , (req,res) => {


        if(!req.query.address){
            return res.send({
                error : "you must provide an address term ",
                "title"  :"weather"
            })
        } 


        const address = req.query.address;

        geoCoding(address,(error,{latitude ,longitude ,location}  ={ }) => {

            
            if(error){
                return  res.send( { Error: error })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
        
            if(error){
                return  res.send( { Error: error })

            }
            
            return  res.send( { address, location ,forecast : forecastData })

        })

    });
    
})

app.get("/products" ,(req,res) => {


    if(!req.query.search){
       return res.send("you must provide a serach value")
    }



    res.status(200).send({
        products :  []
    });
})

app.get("/about" ,(req,res) => {

    res.render('about',{
        title : "About",
        name : "mohammed",
    })
})

app.get("/help" , (req,res) => {
    res.render("help" ,{
        title : "Help",
        helpText :" '''this is a my helpfull expression'''",
        name : "mohammed",

    })
})

app.get("/help/*" , (req,res) => {
    res.render(  "404",{
        title : "404",
        messageError : 'Help article not found',
        name :"mohammed"
    })
})

app.get("*" , (req,res) => {
    res.render( '404',{
        messageError : 'Page not founded',
        name : 'mohammed',
        title :"404"
    })
})

app.listen(port , () => {
    console.log("the server is up on port " + port);
})