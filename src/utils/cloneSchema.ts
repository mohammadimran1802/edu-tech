import { Schema } from "mongoose";

export default function cloneSchema<P>(schema: Schema, keys: (keyof P)[]){
    const newSchema = {};
    schema.eachPath((pathname, schematype) => {
        if(pathname == "_id" || keys.indexOf(pathname.split(".")[0] as keyof P) != -1){
            newSchema[pathname] = schematype;
        }
    });
    return newSchema;
}