const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const modeloDepartamento = prisma.departamentos;

exports.listarDepartamentos = async (req, res) => {
  const listarDepartamento = await modeloDepartamento.findMany({});
  if (!listarDepartamento || listarDepartamento.length == 0) {
    res.send("No hay datos en la tabla");
  } else {
    res.json(listarDepartamento);
  }
};

exports.agregarDepartamento = async (req, res) => {
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
    .catch((error) => {
      console.log(error);
      res.send("Ocurrio un error");
    });
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
};