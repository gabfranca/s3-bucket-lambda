'use strict';

const aws = require('aws-sdk');
var BucketS3Service = require('./services/bucket-s3-service');
var UserRepository = require('./repository/user-repository');

const s3 = new aws.S3({ apiVersion: '2006-03-01', region: 'sa-east-1' });

module.exports.handler = async (event, context, callback) => {
  var bucketService = new BucketS3Service();
  const userRepository = new UserRepository();
  console.log('iniciando leitura do arquivo');
  const bucket = 'my-bucket-teste1'
  const key = 'base-teste-conversao.txt';
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const { Body } = await s3.getObject(params).promise();
  const userModelList = bucketService.convertToModel(Body);
  userRepository.putAll(userModelList);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'lambda function execute sucessfully!',
      input: event,
      data: userModelList
    }),
  };
  console.log(response);
  return response;
};

