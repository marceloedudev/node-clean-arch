import UserRoutes from '@/internal/user/delivery/http/user_routes';
import express from 'express';

const routes = express.Router();

routes.use('/user', new UserRoutes(routes).execute());

export default routes;
