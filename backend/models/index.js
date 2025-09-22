import { Sequelize } from "sequelize";
import "dotenv/config";

// Initialize Sequelize with the database URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Import models
import Members from "./members.js";
import Attendance from "./Attendance.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models
db.Members = Members.init(sequelize, Sequelize.DataTypes);
db.Attendance = Attendance.init(sequelize, Sequelize.DataTypes);

// Set up associations
if (db.Members.associate) {
  db.Members.associate(db);
}
if (db.Attendance.associate) {
  db.Attendance.associate(db);
}

export default db;
