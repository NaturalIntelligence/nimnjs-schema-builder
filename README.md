# nimnjs-schema-builder
Build schema from JS object or JSON to feed into nimnjs


## Usages

First install or add to your npm package
```
$npm install nimn_schema_builder
```

```js
var builder = require("nimn_schema_builder");

var data = {
    name : "amit",
    age : 32,
    male : true,
    projects : [
        {
            name: "some",
            from: new Date(),
            //to: null,
            decription : "some long description"
        }
    ]
}

var schema = builder.build(data);
```

You can also use it in browser from [dist](dist/nimn-schema-builder.js) folder.

Check the demo for instant use.
