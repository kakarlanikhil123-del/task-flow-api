import crypto from "crypto";

export const tasks = [
    {
        id: crypto.randomUUID(),
        title: "learn node.js",
        status: "pending",
        description: "Learn the basics of Node.js",
        priority: "high",
        createdAt: new Date().toISOString()
    },
    {
        id: crypto.randomUUID(),
        title: "learn express.js",
        status: "pending",
        description: "Learn the basics of Express.js",
        priority: "medium",
        createdAt: new Date().toISOString()
    },
    {
        id: crypto.randomUUID(),
        title: "practice rest api",
        status: "pending",
        description: "Practice building REST APIs",
        priority: "high",
        createdAt: new Date().toISOString()
    }
];