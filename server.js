const dev = process.env.NODE_ENV !== 'production';
if (dev) {
    require('dotenv').config({path: __dirname + '/.env'})
}
//koa and koa-session will take care of Shopify OAuth
const Koa = require('koa');
const cors = require('@koa/cors');
const next = require('next');
const koaConnect = require('koa-connect');
const compression = require('compression') 

const port = parseInt(process.env.PORT, 10) || 3000;
//app refers to the Next.js app, which is the react build
const app = next({ dev });
const handle = app.getRequestHandler();

async function handleRender(ctx) {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
}

const corsOptions = {
    origin: process.env.API_URL,
};

//Prepare next.js react app
app.prepare().then(() => {

    //Koa acts like "app" in express
    const server = new Koa();    
    
    server.use(koaConnect(compression()))
    server.use(cors(corsOptions));
    
    server.use(handleRender);    

    server.listen(port, () => {
        console.log(`Running on port: ${port}`);
        console.log(`NODE_ENV === ${process.env.NODE_ENV}`);
        console.log(`API_URL === ${process.env.API_URL}`)
    });
});