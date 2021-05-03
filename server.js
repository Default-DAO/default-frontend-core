const dev = process.env.NODE_ENV !== 'production';
if (dev) {
    require('dotenv').config({path: __dirname + '/.env'})
}
//koa and koa-session will take care of Shopify OAuth
const Koa = require('koa');
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

async function cors(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-No-CORS-Reason, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true);
    await next();
}

//Prepare next.js react app
app.prepare().then(() => {

    //Koa acts like "app" in express
    const server = new Koa();    
    
    server.use(koaConnect(compression()))
    server.use(cors);
    
    server.use(handleRender);    

    server.listen(port, () => {
        console.log(`Running on port: ${port}`);
    });
});