module.exports = {
    apps: [{
        name: 'default-fe',
        script: 'node_modules/.bin/next',
        args: 'start',
        cwd: './',
        instances: 2,
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'production',
        }
    }],
};
