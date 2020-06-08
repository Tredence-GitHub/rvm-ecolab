module.exports = function(sequelize, DataTypes) {
    return sequelize.define('categoryData', {
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true,
                field:"categoryId"
            },
            categoryName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'categoryName',
                unique: false
            },
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field:"projectId"
            },

        },
        {
            timestamps: false,
            tableName: 'categoryData'
        }
    )
}
