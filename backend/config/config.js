require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    protocol: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
