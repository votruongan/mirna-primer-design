const router = require("./router");
const app = require("./app");

const config = require("./config");

app.useRouter(router);

const server = require("http").createServer(app.callback());

const DEFAULT_PORT = 3000;

const main = async () => {
  const port = process.env.PORT || config.port || DEFAULT_PORT;
  try {
    app.listen(port);
    console.log(`---\nPrimer Design server is listenning on port ${port}\n---`);
  } catch (error) {
    console.log("Can't start server due to: ", error);
  }
};

if (require.main === module) main();
