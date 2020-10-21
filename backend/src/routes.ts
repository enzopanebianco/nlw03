import {Router} from 'express';
import OrphanagesController from './controllers/OrphanageControllers'
import multer from 'multer';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages',OrphanagesController.index);
routes.post('/orphanages',upload.array('images'),OrphanagesController.create);
routes.get('/orphanages/:id',OrphanagesController.show);

export default routes;
