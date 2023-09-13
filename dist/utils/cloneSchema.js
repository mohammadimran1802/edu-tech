"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneSchema(schema, keys) {
    const newSchema = {};
    schema.eachPath((pathname, schematype) => {
        if (pathname == "_id" || keys.indexOf(pathname.split(".")[0]) != -1) {
            newSchema[pathname] = schematype;
        }
    });
    return newSchema;
}
exports.default = cloneSchema;
