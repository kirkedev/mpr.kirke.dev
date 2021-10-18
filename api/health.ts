import type { FastifyReply, FastifyRequest } from "fastify";

interface HealthStatus {
    uptime: number;
    timestamp: number;
}

function getHealth(_: FastifyRequest, reply: FastifyReply): void {
    reply.send({
        uptime: process.uptime(),
        timestamp: Date.now()
    });
}

export default getHealth;
export type { HealthStatus };
