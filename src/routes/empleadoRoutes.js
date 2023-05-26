import { Router } from 'express';
import { check } from 'express-validator';
import empleadoCtrl from '../controllers/empleado.controller.js';
import { validFields } from '../middleware/Validfields.js';
import { seedDt } from '../seed/seedDb.js';

const route=Router();

// seed poblar base de datos

route.get("/seed",seedDt);

route.get('/',empleadoCtrl.listar);
route.get('/:id',empleadoCtrl.listById);


route.post('/',

[
    check("nombres","el campo nombres es obligatorio").trim().notEmpty(),

    check("apellidos").optional().isLength
    ({min: 4, max: 50}),

    check("correo").isEmail(),

    check("edad","el campo edad es obligatorio").notEmpty(),

    check("salario","el campo salario es obligatorio").notEmpty(),

    check("cargo","el campo cargo es obligatorio").notEmpty(),

],

validFields,

empleadoCtrl.guardar);


route.put('/:id',empleadoCtrl.actualizar);
route.delete('/:id',empleadoCtrl.eliminar);

export default route;

//1:00:31 backend 2 ENDED