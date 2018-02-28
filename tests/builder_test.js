var builder = require("../builder");

describe("Nimn Schema Builder", function () {

    it("should build schema for valid object", function () {
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

        var expected = {
            name : "string",
            age : "number",
            male : "boolean",
            projects : [
                {
                    name: "string",
                    from: "date",
                    //to: null,
                    decription : "string"
                }
            ]
        };
        
        var result = builder.build(data);
        //console.log(JSON.stringify(result,null,4));
        expect(result).toEqual(expected);
    });

    it("should build schema for valid array", function () {
        var data = ["amit", "kymar", "gupta"];
        var expected = [ "string"];
        
        var result = builder.build(data);
        //console.log(JSON.stringify(result,null,4));
        expect(result).toEqual(expected);
    });

    it("should error for null, function, symbol", function () {
        var data = {
            name : "amit",
            age : 32,
            male : true,
            projects : [
                {
                    name: "some",
                    from: new Date(),
                    to: null,
                    decription : "some long description"
                }
            ]
        }
        expect(function(){
            builder.build(data)
        }).toThrow();
    });

    it("should error for function, symbol, and undefined", function () {
        var data = {
            name : "amit",
            age : 32,
            male : undefined,
        }
        expect(function(){
            builder.build(data)
        }).toThrow();
    });

});