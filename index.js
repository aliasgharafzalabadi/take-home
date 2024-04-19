const express = require("express")
const cors = require("cors");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const authenticate = require("./middlewares/authenticate")
const routers = require("./routes/index");

const db = require("./models")

const app = express();

app.use(express.json());

app.use(cors());

app.use("/public", express.static("public"));

app.use('/api',authenticate , routers);

app.listen(3000, async()=>{
    console.log("up")
})

const compiler = webpack(webpackConfig);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    })
);