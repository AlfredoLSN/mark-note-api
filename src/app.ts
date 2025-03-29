import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import multer from "multer";
import { extractFileExtension } from "./utils/fileExtension";

dotenv.config();
const app = express();

//Multer Config

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedExtensions = ["md", "markdown"];
  const fileExtension = file.originalname.split(".").pop()?.toLowerCase();
  console.log(fileExtension);
  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    console.log("teste");
    cb(null, false);
    return;
  }

  console.log("teste2");
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post(
  "/file",
  upload.single("markdownFile"),
  (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "Voce de enviar um arquivo markdown" });
      return;
    }
    const fileExtension = extractFileExtension(file.originalname);
    if (
      (fileExtension !== "md" && fileExtension !== "markdown") ||
      !fileExtension
    ) {
      res.status(400).json({
        message: "O arquivo enviado deve ter a extensao .md ou .markdown.",
      });
      return;
    }

    res.send("Arquivo salvo");
  }
);

app.listen(3000, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});
