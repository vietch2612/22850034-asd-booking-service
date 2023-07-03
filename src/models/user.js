'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, { foreignKey: 'roleId' })
        }
    }
    User.init({
        email: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};