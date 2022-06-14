const Trip = require("../models/Trips"); //trazendo a viagem que está cadastrada
let message = "";
let type = "";
const orderById = { order: [["id", "ASC"]] }; //objeto e ele vai ter o order, que tem um array que tem outro array, falo o campo que eu quero ordenar e como eu quero ordenar

const Op = require("sequelize").Op; //trazendo os pacotes de operadores do sequelize

//getAll - Lista todos
const getAll = async (req, res) => {
  //async, aguarda porque eu vou lá fazer a consulta espere as ações para renderizar a página
  try {
    //tente por esse caminho se der certo
    const trips = await Trip.findAll(orderById); //aguardando
    res.render("index", {
      trips,
      message,
      type,
      tripSearch: [],
    });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

//rota para pegar o ID da viagem selecionada
const getById = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id); //encontranda a viagem que foi escolhida pelo id, findByPk procurar pela chave primaria que é o id, e esse id vai chegar por parametro
    const trips = await Trip.findAll(orderById);//só para melhorar a vizualização
    res.render("detalhes", {
      trip,
      message,
      type,
      tripSearch: [],
    });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

//rota de criação da viagem
const criar = (req, res) => {
  try {
    res.render("criar", { message, type });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

const criacao = async (req, res) => {
  try {
    const trip = req.body; //a requisição que vem do body, pegando os dados que vem do body
    if (
         !trip.city ||
         !trip.country ||
         !trip.location_name || 
         !trip.summary || 
         !trip.image) 
         {
      message = "Please, fill in all required fields!";
      type = "danger";
      return res.redirect("/criar");
    }
    await Trip.create(trip); //model trip e cria a viagem que chegou, async espera essa transação
    res.redirect("/");
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

//rota editar viagem
const editar1 = async (req, res) => {
  const trip = await Trip.findByPk(req.params.id);

  if (!trip) {
    res.render("editar", {
      message: "Trip not found!",
      type: "danger",
    });
  }
  res.render("editar", {
    trip,
    message: "Updated!",
    type:"success",
  });
};

//rota de edição da viagem
const editar = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    const { city, country, location_name, summary, image } = req.body;

    trip.city = city;
    trip.country = country;
    trip.location_name = location_name;
    trip.summary = summary;
    trip.image = image;

    const tripEditado = await trip.save();
    // res.render("editar", {
    //     trip: tripEditado,
    //     message:"Updated!",
    // });
    res.redirect("/");
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

//rota deletar a viagem
// const deletar = async (req, res) => {
//   try {
//     await Trip.destroy({ where: { id: req.params.id } });
//     message = "Trip deleted!",
//     type = "success",
//     res.redirect("/");
//   } catch (err) {
//     //deu erro, venha nesse caminho
//     res.status(500).send({ err: err.message }); //vem do objeto erro
//   }
// };

//rota da prof duda deletar
const deletar = async (req,res) => {
  try{
    const trip = await Trip.findByPk(req.params.id);

    if(!trip){
      res.render("deletar", {
        message: "Trip not found!",
        type: "danger",
      });
    }
    res.render("deletar", {
      trip, message:"",
    });
  }catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
}
};

const deletar1 = async (req,res) => {
  const trip = await Trip.findByPk(req.params.id);

  if(!trip){
    res.render("deletar", {
      message: "Trip not found!",
    });
  }

  await trip.destroy();
  res.redirect("/");
};

//rota de pesquisar a viagem
const pesquisaCity = async (req, res) => {
  try {
    const trip = await Trip.findAll({
      where: {
        //onde, ele apontando onde vai buscar
        city: {
          //ele busca no city
          [Op.like]: `%${req.body.trip}%`, //para pegar o campo city que vem do input
        }, //esse valor vem do meu campo de body, que vem do input viagem
      },
      order: [["id", "ASC"]],
    });

    if (trip.length == 0) {
      message = "Trip not found!",
      type = "danger"
      return res.redirect("/"); //parar a função de pesquisa
    }

    res.render("index", {
      trips: [],
      message,
      type,
      tripSearch: trip,
    });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

module.exports = {
  getAll,
  getById,
  criar,
  criacao,
  editar1,
  editar,
  deletar,
  deletar1,
  pesquisaCity,
};