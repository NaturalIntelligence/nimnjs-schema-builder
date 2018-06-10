
/**
 * Build Schema for nimnification of JSON data
 * @param {*} jsObj 
 */
function buildSchema(jsObj,key){
    var type = typeOf(jsObj);
    switch(type){
        case "array":
            var schema = {
                type : 'list',
                detail : buildSchema(jsObj[0])
            };
            key && ( schema.name = key)
            return schema;
        case "object":
            var schema = {  
                type : 'map',
                detail : []
            };
            key && ( schema.name = key);
            var keys = Object.keys(jsObj);
            for(var i in keys){
                var key = keys[i];
                schema.detail.push( buildSchema(jsObj[key], key) );
            }
            return schema;
        case "string":
        case "number":
        case "date":
        case "boolean":
            var schema = {
                type : type,
            };
            key && ( schema.name = key)
            return schema;
        default:
            throw Error("Unacceptable type : " + type);
    }
}

function typeOf(obj){
    if(obj === null) return "null";
    else if(Array.isArray(obj)) return "array";
    else if(obj instanceof Date) return "date";
    else return typeof obj;
}

module.exports.build = buildSchema;