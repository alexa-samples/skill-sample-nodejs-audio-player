
var MockDynamo = {
    userIdMap: {},

    get: function(table, userId, callback) {
        var params = {
            Key: {
                userId: userId
            },
            TableName: table,
            ConsistentRead: true
        };

        var data = MockDynamo.userIdMap[userId];
        if (data === undefined || data === null || isEmptyObject(data)) {
            callback(null, {});
        } else {
            callback(null, data.Item['mapAttr']);
        }
    },

    set: function(table, userId, data, callback) {
        var params = {
            Item: {
                userId: userId,
                mapAttr: data
            },
            TableName: table
        };

        MockDynamo.userIdMap[userId] = params;
        callback(null, data);

    }
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = MockDynamo;