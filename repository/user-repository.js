const AWS = require('aws-sdk');

AWS.config.update({ region: "sa-east-1" });

function UserRepository() {

    this.ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    this.documentClient = new AWS.DynamoDB.DocumentClient({ region: "sa-east-1" });
    this.tableName = 'Users';
}

UserRepository.prototype.putAll = async function (itens) {

    try {
        for (var item of itens) {
            var params = {
                TableName: this.tableName,
                Item: item
            }
            const data = await this.documentClient.put(params).promise();
            console.log('inserindo objeto:', JSON.stringify(item));
        }
    } catch (err) {
        console.log('Unable to put user data', err);
    }
    return params;
}


module.exports = UserRepository;