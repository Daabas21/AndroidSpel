import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const route = Router();

route.get('/', async (req, res) => {
    
    const messages = await prisma.messages.findMany({
        select:{
            id: true,
            message: true
        }
    })

    res.json(messages)
})

route.post('/', async (req, res) => {

    const message = await prisma.messages.create({
        data: {
            message: req.body.message,
            private: req.body.private,
            game_id: req.body.game_id
        }
    })

    res.json(message)
})

route.delete('/:id', async (req, res) => {

    await prisma.messages.delete({
        where : {
            id : parseInt(req.params.id)
        }
    })

    res.sendStatus(204)
})


export default route;