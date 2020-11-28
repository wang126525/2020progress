import path from "path";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import server from "rollup-plugin-serve";
import ts from "rollup-plugin-typescript2"

export default{
    input: "index.ts",
    output:{
        format:'iife',
        file:path.resolve("dist/index.js"),
        sourcemap:true
    },
    plugins:[
        nodeResolve({
            extensions:[".js",".ts"]
        }),
        ts({
            tsconfig:path.resolve(__dirname,"tsconfig.json")
        }),
        server({
            open:false,
            openPage:'/index.html',
            port:3000,
            contentBase:""
        })
    ]
}