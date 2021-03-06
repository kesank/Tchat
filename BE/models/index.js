const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.message = require("./message.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

db.message.belongsTo(db.user, {
    onDelete: 'cascade', foreignKey: { allowNull: false },
    hooks: true
});
db.user.hasMany(db.message);
db.comments.belongsTo(db.user, {
    onDelete: 'cascade', foreignKey: { allowNull: false },
    hooks: true
});
db.user.hasMany(db.comments);
db.comments.belongsTo(db.message, {
    onDelete: 'cascade', foreignKey: { allowNull: false },
    hooks: true
});
db.message.hasMany(db.comments);
module.exports = db;