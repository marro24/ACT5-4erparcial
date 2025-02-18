const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const FILE_PATH = "productos.json";

app.use(express.json());
app.use(cors());

// 📌 Leer productos del archivo JSON
app.get("/productos", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error al leer productos" });
        res.json(JSON.parse(data || "[]"));
    });
});

// 📌 Guardar productos en el archivo JSON
app.post("/productos", (req, res) => {
    const nuevosProductos = req.body;

    fs.writeFile(FILE_PATH, JSON.stringify(nuevosProductos, null, 2), (err) => {
        if (err) return res.status(500).json({ error: "Error al guardar productos" });
        res.json({ mensaje: "Productos guardados con éxito" });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
