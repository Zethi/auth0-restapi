import config from "./configs/config";
import App from "./index";

console.log(
  `Server started on http://${config.express.host}:${config.express.port}`
);

App.listen(config.express.port);
