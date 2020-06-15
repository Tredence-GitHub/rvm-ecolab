/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('version', {
		versionName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'version_Name',
			primaryKey: true
		},
		viewName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'View_Name'
		},
		viewType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'View_Type'
		},
		curCostEstStd: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Cur_cost_est_std'
		},
		curTonPeriodStd: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Cur_ton_period_std'
		},
		priorCostEstStd: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Prior_cost_est_std'
		},
		priorTonPeriodStd: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Prior_ton_period_std'
		},
		curTonTypeForecast: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Cur_ton_Type_Forecast'
		},
		curCostEstForecast: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Cur_cost_est_Forecast'
		},
		curTonPeriodForecast: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Cur_ton_period_Forecast'
		},
		priorTonTypeForecast: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Prior_ton_Type_Forecast'
		},
		priorCostEstForecast: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Prior_cost_est_Forecast'
		},
		priorTonPeriodForecast: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Prior_ton_period_Forecast'
		},
		userEmail: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'User_email'
		},
		requestedDate: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Requested_date'
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Status'
		},
		refreshEta: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Refresh_ETA'
		},
		expiryDate: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Expiry_date'
		}
	}, {
		tableName: 'version'
	});
};
