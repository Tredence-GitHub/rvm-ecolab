/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('savedFilters', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey:true,
      autoIncrement:true
		},
		filterName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'filterName',
      unique: true
		},
    filterDesc: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'filterDesc'
		},
    user: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'user'
		},
    filterValues:{
      type: DataTypes.TEXT,
			allowNull: false,
			field: 'filters'
    }
	}, {
    timestamps: true,
		tableName: 'savedFilters'
	});
};
