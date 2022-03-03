const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const modeloDepartamento = prisma.departamentos;
const joi = require("@hapi/joi");
const { string } = require("@hapi/joi");

const validarAgregar = joi.object({
  nombreDepartamento: joi.string().min(5).required()
});
const validarModificar = joi.object({
  nombreDepartamento: joi.string().min(5).required()
})
exports.listarDepartamentos = async (req, res) => {
  const listarDepartamento = await modeloDepartamento.findMany({});
  if (!listarDepartamento || listarDepartamento.length == 0) {
    res.send("No hay datos en la tabla");
  } else {
    res.json(listarDepartamento);
  }
};

exports.agregarDepartamento = async (req, res) => {
  try
  {
    await validarAgregar.validateAsync(req.body);
    const { nombreDepartamento } = req.body;
    await modeloDepartamento
    .create({
      data: {
        nombreDepartamento: nombreDepartamento,
      },
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
  } catch(err){
    console.log(err);
    if (err.isJoi)
    {
      res.send(err.details[0].message)
    }
    else{
      res.send("error inesperado");
    }
  }
};



exports.eliminarDepartamento = async (req, res) => {
  let { idDepartamento } = req.query;
  idDepartamento = parseInt(idDepartamento);
  const buscarDepartamento = await modeloDepartamento.findMany({
    where: { id_departamento: idDepartamento },
  });
  if (!buscarDepartamento) {
    res.send("Este departamento no existe");
  } else {
    await modeloDepartamento
      .delete({
        where: {
          id_departamento: idDepartamento,
        },
      })
      .then((data) => {
        console.log(data);
        res.send("Departamento eliminado");
      })
      .catch((error) => {
        console.log(error);
        res.send("Ocurrio un error");
      });
  }
};
exports.actualizarDepartamento = async (req, res) => {
  try
 {
  await validarModificar.validateAsync(req.body);
  let { idDepartamento } = req.query;
  const { nombreDepartamento} = req.body;
  idDepartamento = parseInt(idDepartamento);
  const buscarDepartamento = await modeloDepartamento.findMany({
    where: { id_departamento: idDepartamento },
  });
  if (!buscarDepartamento) {
    res.send("Este departamento no existe");
  } else {
    await modeloDepartamento
      .update({
        where: {
          id_departamento: idDepartamento,
        },
        data:{
            nombreDepartamento:nombreDepartamento
        }
      })
      .then((data) => {
        console.log(data);
        res.send("Departamento eliminado");
      })
      .catch((error) => {
        console.log(error);
        res.send("Ocurrio un error");
      });
  }
}catch(err){
  console.log(err);
    if (err.isJoi)
    {
      res.send(err.details[0].message)
    }
    else{
      res.send("error inesperado");
    }
}
};
