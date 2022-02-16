const {
  db: { username, password, database, host },
} = require("./index");

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    dialect: "postgres",
    seederStorage: "sequelize",
    use_env_variable: "DATABASE_URL",
  },
};
