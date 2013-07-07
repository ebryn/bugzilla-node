// server config options that are overwriteable by env vars
module.exports = {
  BZ_DB_HOST: process.env.BZ_DB_HOST || 'localhost',
  BZ_DB_USER: process.env.BZ_DB_USER || 'root',
  BZ_DB_PASSWORD: process.env.BZ_DB_PASSWORD || '',
  BZ_DB_NAME: process.env.BZ_DB_NAME || 'bugzilla_public_20130102',
  BZ_REST_ENDPOINT: process.env.BZ_REST_ENDPOINT || 'http://bugzilla-api.erikbryn.com/bzapi_staging/',
  PORT: process.env.PORT || 8888
};
