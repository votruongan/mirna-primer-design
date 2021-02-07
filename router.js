const Router = require("koa-router");
const send = require("koa-send");
const router = new Router();

const process = require("./process");

router.all("/", async (ctx) => {
  send(ctx, "./index.html", { root: "./public" });
});

router.get("/sequence/:hmId", async (ctx) => {
  const { hmId } = ctx.params;
  const res = process.hmSeqObject[hmId];
  if (res) return (ctx.body = res);
  ctx.body = "";
});

module.exports = router;
