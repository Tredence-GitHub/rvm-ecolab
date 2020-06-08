module.exports = function(sequelize, DataTypes) {
    return sequelize.define('categoryViewConjunction', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true,
                field:"id"
            },
            categoryId: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'categoryId',
                unique: true
            },
            viewId: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'viewId',
                unique: true
            },
        },
        {
            timestamps: true,
            tableName: 'categoryViewConjunction'
        }
    )
}
