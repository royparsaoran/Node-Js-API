require('dotenv').config();
const confidence = require('confidence');


const config = {
   aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      bucketName: process.env.AWS_BUCKET_NAME || '',
      region: process.env.AWS_REGION || 'us-east-1',
      endPoint: process.env.AWS_ENDPOINT || 'sgp1.digitaloceanspaces.com'
   }
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
