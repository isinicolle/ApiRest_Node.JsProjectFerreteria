const { Router } = require('express');
const controladorImg = require('../controladores/controladorImg');
const router = Router();

router.post('/img', controladorImg.img);

module.exports=router;