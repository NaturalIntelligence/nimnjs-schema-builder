/**
 * Build Schema for nimnification of JSON data
 * @param {*} jsObj
 */
function buildSchema(jsObj, key) {
  if (jsObj === undefined || jsObj === null) return null;

  var type = typeOf(jsObj);
  switch (type) {
    case "array":
      {
        let schema = {
          type: "list",
          detail: buildSchema(jsObj[0])
        };
        key && (schema.name = key);
        return schema;
      }
    case "object":
      {
        let schema = {
          type: "map",
          detail: []
        };
        key && (schema.name = key);
        let keys = Object.keys(jsObj);
        for (var i in keys) {
          let key = keys[i];
          if (jsObj[key]) {
            schema.detail.push(buildSchema(jsObj[key], key));
          }
        }
        return schema;
      }
    case "string":
    case "number":
    case "date":
    case "boolean":
      {
        let schema = {
          type: type
        };
        key && (schema.name = key);
        return schema;
      }
    default:
      throw Error("Unacceptable type : " + type);
  }
}

function typeOf(obj) {
  if (Array.isArray(obj)) return "array";
  else if (obj instanceof Date) return "date";
  else return typeof obj;
}

module.exports.build = buildSchema;
