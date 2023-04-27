require('dotenv').config();
const express = require('express');
const path = require('path');

const connectToDatabase = require('./database/db');

const Music = require('./model/music');

const app = express();

const port = process.env.PORT || 3000;

let music = null; //quando renderizar vou passar tambem a musica

let musicDel = null; //crio a variavel musicDel como null




app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());

app.set("view engine", "ejs");


connectToDatabase();



app.get("/", async (req, res) => {
    const playlist = await Music.find();
    console.log(playlist);
    res.render("index", {playlist});
})




app.get("/admin", async (req, res) => {
    const playlist = await Music.find();
    res.render("admin", {playlist, music: null , musicDel: null});
});




app.post("/create", async (req, res) => {
    const music = req.body;//envio as informaçoes
    await Music.create(music);//gravo as informaçoes no banco
    res.redirect("/");//retorna para o index
});









app.get("/by/:id/:action", async (req, res) => {
    const { id, action} = req.params; // enviando uma requisiçao de request
    music = await Music.findById({_id: id}); // fui no banco de dados e peguei a musica (get)
    const playlist = await Music.find();

    if(action == "edit"){ //premissa verdadeira
        res.render("admin", {playlist, music, musicDel: null}); // renderiza o modal editar
    }else{
        res.render("admin", {playlist, music: null, musicDel: music}); // renderiza o modal deletar
    }
    
});




app.get("/delete/:id", async (req, res) => {

    await Music.deleteOne({ _id: req.params.id}) // requisiçao requedt pega o id e deleta a musica
    res.redirect("/admin"); //response é redirecionar para a pagina admin
})






app.post("/update/:id", async (req, res) => {

    const newMusic = req.body;//envio da requisiçao
    await Music.updateOne({_id: req.params.id}, newMusic);//atualizacao no banco de dados
    
    res.redirect("/admin");//resposta para pagina admin
});





app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})