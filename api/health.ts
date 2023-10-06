interface HealthStatus {
    uptime: number;
    timestamp: number;
}

const getHealth = (): HealthStatus => ({
    uptime: process.uptime(),
    timestamp: Date.now()
});

export default getHealth;
export type { HealthStatus };
