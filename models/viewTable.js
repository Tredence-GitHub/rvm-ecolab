module.exports = function(sequelize, DataTypes) {
    return sequelize.define('viewData', {
            viewId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true,
                field:"viewId"
            },
            viewName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'viewName',
                unique: false
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'createdBy'
            },
            updatedBy: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'updatedBy'
            },
            viewDescription:{
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'viewDescription'
            },
            viewStatus: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'viewStatus'             
            },
            htmlTemp: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'htmlTemp'             
            },
            projectId: {
                type: DataTypes.INTEGER,
                field:"projectId"
            },

            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'categoryId'                             
            },

        }, 
        {
            timestamps: false,
            tableName: 'viewData'
        }
    )
}








/*



ViewCol1 ViewCol2  categoryId_F   CatCol1 CatCol2  projectID_F    projCol1 projCol2

fin                Recomm         Recomm           Amazon         Amazon

fin                Recomm         Recomm           Walmart        Walmart 


*/










