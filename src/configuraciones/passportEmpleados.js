const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require('passport');
const modeloEmpleado = prisma.usuarioEmpleados;
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(20, "m").asSeconds();
const clave = 'clavesecreta';

exports.generarToken = (data) => {
    return JWT.sign(data, clave, { expiresIn: duracion });
};
const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use(new estrategiaJWT(opciones, async (payload, done) => {
    return await modeloEmpleado.findUnique({
        where: {
            nom_usuarioEmpleado: payload.nom_usuarioEmpleado
        }
    })
        .then((data) => {
            return done(null, data.nom_usuarioEmpleado);
        })
        .catch((error) => {
            return done(null, false);
        });
}));

exports.ValidarAutenticado = passport.authenticate('jwt', { session: false, failureRedirect: '/api/usuarioEmpleados/error/' });