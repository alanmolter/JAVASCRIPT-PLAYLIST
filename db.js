const mongodb = require("mongoose");

mongodb.set("strictQuery", true);


const connectToDatabase = async () => {
  await mongodb.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.b3ebou4.mongodb.net/?retryWrites=true&w=majority`, //chave de conexao que o banco fornece
   
        (error) => {
        if (error) {
            return console.log("erro ao conectar com o banco", error);
        }
        return console.log("Conexao com o banco realizada com sucesso");
        }
  );//fecha a funçao dos parametros de conexao
};//fecha a funçao de conexao


module.exports = connectToDatabase;