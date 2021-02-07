const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");

var app = new Koa();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  await next();
});

app.use(bodyParser());

// serve files in public folder (css, js etc)
app.use(serve(__dirname + "/public"));

app.useRouter = (router) => {
  app.use(router.routes()).use(router.allowedMethods());
};

module.exports = app;
