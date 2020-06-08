module.exports = function(sequelize, DataTypes) {
    return sequelize.define('projectData', {
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true,
                field:"projectId"
            },
            projectName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'projectName',
                unique: true
            },
        },
        {
            timestamps: false,
            tableName: 'projectData'
        }
    )
}