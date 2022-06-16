// Digital Ocean Space Lib

const { CompleteMultipartUploadRequest } = require('@aws-sdk/client-s3');
const aws = require('aws-sdk')
const config = require('../../infra/configs/aws_config')
const appConfig = require('../../infra/configs/global_config').get('/app')
const awsConfig = config.get('/aws');
const wrapper = require('./wrapper')

const spacesEndpoint = new aws.Endpoint(awsConfig.endPoint);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region
})

const getListBucket = async () => {
    return s3.listBuckets((err, data) => {
        if (err) {
            return wrapper.error(err, data)
        }
        return wrapper.response(data.Buckets)
    })
};

const uploadObject = async (fileObject, fileName,foldername = '', contentType = '') => {
    let prefix = appConfig.env + '/';
    
    if(foldername !== ''){
        prefix += foldername + '/'
    }

    fileName = prefix + fileName
    const params = {
        Bucket: awsConfig.bucketName,
        Key: fileName,
        Body: fileObject,
        ACL: 'public-read'
    };
    if(contentType !== ''){
        params.ContentType = contentType
    }
    const data =  s3.upload(params).promise();

    return data.then((result) => {
        return result;
    }).catch(err => {
        console.log(err)
        return null
    })

}

const deleteObject = async (objectKey) => {
    
    let prefix = appConfig.env + '/';

    objectKey = prefix + objectKey

    return s3.deleteObject({
        Bucket: awsConfig.bucketName,
        Key: objectKey
    }, (err, data) => {
       console.log(err, data)
    })
}

const deleteBucket = async (objectKey) => {
    return s3.deleteBucket({
        Bucket: awsConfig.bucketName
    }, (err, data) => {
        if (err) {
            return wrapper.error(err, data)
        }
        return wrapper.response(data)
    })
}

module.exports = {
    getListBucket,
    uploadObject,
    deleteBucket,
    deleteObject
};
