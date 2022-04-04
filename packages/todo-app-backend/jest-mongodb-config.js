export default {
    mongodbMemoryServerOptions: {
        binary: {
            version: '4.0.3',
            skipMD5: true,
        },
        instance: {
            dbName: 'todo-app',
        },
        autoStart: false.valueOf,
        mongoURLEnvName: 'MONGO_URI',
    },
};