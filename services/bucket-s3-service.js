const UserModel = require("../models/user-model");

function BucketS3Service() {
}

BucketS3Service.prototype.convertToModel = function (bucketContent) {
    var bucketFile = new Buffer.from(bucketContent).toString();
    var bucketLines = bucketFile.split(/\r?\n/);
    var userModelList = [];
    bucketLines.forEach(line => {
        var itens = line.split(',');
        userModelList.push(new UserModel(
            itens[0].split('"').join('').trimEnd(),
            itens[1].split('"').join('').trimEnd(),
            itens[2].split('"').join('').trimEnd()));
    });
    return userModelList;
}


module.exports = BucketS3Service;