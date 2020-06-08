/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('recommendationPage', {
        asin: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'ASIN'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Title'
        },
        productUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Product_URL'
        },
        estimatedRevenueImpact: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Estimated_revenue_impact'
        },
        oosWithInventoryInNetwork: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'OOS_with_inventory_in_network'
        },
        highInventoryLevels: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'High_inventory_levels'
        },
        lowInventoryLevels: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Low_inventory_levels'
        },
        kcPlatform: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'KC_PLATFORM'
        },
        kcCategory: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'KC_CATEGORY'
        },
        kcSubCategory: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'KC_SUB_CATEGORY'
        },
        kcPrimaryManufacturer: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'KC_PRIMARY_MANUFACTURER'
        },
        kcPrimaryBrand: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'KC_PRIMARY_BRAND'
        },
        prioritySku: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'PRIORITY_SKU'
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id',
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Category'
        }
    }, {
        tableName: 'RecommendationPage'
    });
};