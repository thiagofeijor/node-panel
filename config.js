const config = {
  environment: process.env.NODE_ENV || 'dev',
  mongo: {
    link: 'mongodb://master:master@ds161069.mlab.com:61069/heroku_6sbdh803'
  },
  server: {
    port: process.env.PORT || 3001
  },
  token_web: 'e4ZSAPkR3EsAPFypfZrDxC9zgXTDtQ80',
  token_adm: 'e4ZSAPkR3EsAomsKnrDxC9zgXTDtQ80'
};

module.exports = config;