let Service = require('node-windows').Service;

let svc = new Service({
    name: 'node_kanban_client',
    description: 'node kanban client',
    script: 'D:/team/front/kanban-front/build/dev-server.js'
});

svc.on('install', () => {
    svc.start();
});

svc.install();