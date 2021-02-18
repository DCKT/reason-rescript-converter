import fs from "fs";
import { exec } from "child_process";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const filePath = `${process.cwd()}/Tmp.re`;
    const resultPath = `${process.cwd()}/Tmp.res`;

    fs.writeFileSync(filePath, req.body.code);

    exec(`bsc -format Tmp.re > Tmp.res`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        fs.unlinkSync(filePath);
        res.status(500).end(error);
        return;
      }

      const result = fs.readFileSync(resultPath, "utf-8");

      fs.unlinkSync(filePath);

      res.status(200).json({
        result: result,
      });
    });
  } else {
    res.status(404).end();
  }
}
