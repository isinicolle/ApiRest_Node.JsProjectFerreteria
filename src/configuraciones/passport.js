const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require('passport');
const modeloUsuario = prisma.usuariosClientes;
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(20, "m").asSeconds();
const clave = 'clavesecreta2022';
                  
exports.generarToken = (data) => {
    return JWT.sign(data, clave, { expiresIn: duracion});
};
const opciones= {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use(new estrategiaJWT(opciones, async (payload, done) =>{
    return await modeloUsuario.findFirst({
        where:{
            correo_usuario: payload.correo_usuario
        }
    })
    .then ((data) =>{
        return done(null, data.correo_usuario);
    })
    .catch((error)=>{
        return done(null, false);
    });
}));

exports.ValidarAutenticado= passport.authenticate('jwt', {session: false, failureRedirect: '/api/usuarioCliente/error/'});