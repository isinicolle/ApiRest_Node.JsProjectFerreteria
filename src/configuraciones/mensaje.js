const mensaje = (msj, estado, data, res) => { 
    var mensajes = {
        msj: msj,
        data: data
    };
    res.setHeader("Content-Type", "application/json");
    res.statuCode=estado;
    res.json(mensajes);
};

module.exports=mensaje;