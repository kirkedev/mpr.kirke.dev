import type { FastifyReply, FastifyRequest } from "fastify";

function getHealth(_: FastifyRequest, reply: FastifyReply): void {
    reply.send({
        uptime: process.uptime(),
        timestamp: Date.now()
    });
}

export default getHealth;
