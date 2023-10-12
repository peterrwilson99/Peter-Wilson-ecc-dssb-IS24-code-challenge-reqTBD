import express, { Request, Response } from 'express';


const router = express.Router();
/**
 * @swagger
 * /health:
 *  get:
 *      tags:
 *          - Health
 *      description: Server Healthcheck
 *      responses:
 *          200:
 *              description: OK
 */
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});

export default router;