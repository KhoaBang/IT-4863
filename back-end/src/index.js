const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const start = async () => {
    if (
        !process.env.ELASTICSEARCH_NODE ||
        !process.env.ELASTICSEARCH_USERNAME ||
        !process.env.ELASTICSEARCH_PASSWORD ||
        !process.env.DATA_INDEX
      ) {
        console.error("Missing required environment variables. Check your .env file.");
        process.exit(1);
      }

      app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT || 3333} !!!\n`);
      });
}

start();
