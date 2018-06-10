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
                    decription : "some long description"
                }
            ]
        }

        var expected = {
            type: 'map',
            detail : [{
                    name : "name",
                    type : "string",
                },{
                    name : "age",
                    type : "number",
                },{
                    name : "male",
                    type : "boolean",
                },{
                    name : "projects",
                    type : "list",
                    detail : {
                        type : "map",
                        detail : [
                            {   
                                name : "name",
                                type : "string",
                            },{
                                name : "from",
                                type : "date",
                            },{
                                name : "decription",
                                type  : "string"
                            }
                        ]       
                    }
                }
            ]
        }
        
        var result = builder.build(data);
        //console.log(JSON.stringify(result,null,4));
        expect(result).toEqual(expected);
    });

   it("should build schema for valid array", function () {
        var data = ["amit", "kymar", "gupta"];
        var expected = {
            type : "list",
            detail : {
                type : "string"
            }
        };
        
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