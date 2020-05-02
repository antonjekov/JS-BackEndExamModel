/**@dbName is the name of the database of the current project. You must change it before to start 
 * @dbPort is the port in which work mongodb. Default port for the base is 27017, but if you need you can change it.
 * @defaultServerPort is the port in which will work this server that we make in development mode. If you want you can change it.
 * 
*/

const env = process.env.NODE_ENV || 'development';
const dbName = "examdb"
const dbPort = "27017"
const defaultServerPort = 3000 

const config = {
    development: {
        port: process.env.PORT || defaultServerPort,
        dbURL: `mongodb://localhost:${dbPort}/${dbName}`
    },
    production: {}
};

module.exports = config[env];