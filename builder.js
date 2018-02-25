
/**
 * Build Schema for nimnification of JSON data
 * @param {*} jsObj 
 */
function buildSchema(jsObj){
    var type = typeOf(jsObj);
    switch(type){
        case "array":
            var schema = {
                type: "array",
                properties : {}
            }
            schema.properties["item"] = _bs(jsObj[0]);
            return schema;
        case "object":
            var schema = {
                type: "object",
                properties : {}
            }
            var keys = Object.keys(jsObj);
            for(var i in keys){
                schema.properties[keys[i]] = _bs(jsObj[keys[i]]);
            }
            return schema;
        case "string":
        case "number":
        case "date":
        case "boolean":
            return {type : type};
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