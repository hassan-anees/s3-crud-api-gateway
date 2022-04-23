const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

module.exports.handler = async (event) => {
    console.log('event:', event);
    const response = {
        isBased64: false,
        statusCode: 200,
    };
    
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: decodeURIComponent(event.pathParamerts.fileKey)
        };

        const data = await s3.deleteObject(params).promise();
        response.body = JSON.stringify({message: "Success on deleted file from s3", data})
    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({message: 'failed to delete the file', errorMesssage: e});
        response.statusCode = 500;
    }

    return response;
};