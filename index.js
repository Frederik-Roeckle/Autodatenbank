const monk = require("monk");
const Joi = require("@hapi/Joi");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const xml2js = require("xml2js");
const util = require("util");

const PORT = process.env.PORT || 3000;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Autodatenbank API with Swagger",
      version: "0.1.0",
      description:
        "Dies ist eine RESTful API, gebaut mit NodeJS. Routing durch Express und Datenbank MongoDB",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Autodatenbank",
        email: "frederik.roeckle@gmx.de",
      },
    },
    servers: [
      {
        url: "http://localhost:" + PORT,
      },
    ],
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());

/**
 * @swagger
 * components:
 *   schemas:
 *     KurzInfoAuto:
 *       type: object
 *       required:
 *         - _id
 *         - marke
 *         - modell
 *       properties:
 *         _id:
 *           type: string
 *           description: Eindeutige Id des Autos
 *           example: 60241a80d9e58561f8b49dcf
 *         marke:
 *           type: string
 *           description: Fahrzeugmarke
 *           example: Mercedes
 *         modell:
 *           type: string
 *           description: Modellbezeichnung
 *           example: S-Klasse
 *
 *     Auto:
 *       type: object
 *       required:
 *       properties:
 *         _id:
 *           type: string
 *           description: Eindeutige Id des Autos
 *           example: 60241a80d9e58561f8b49dcf
 *         marke:
 *           type: string
 *           description: Fahrzeugmarke
 *           example: Mercedes
 *         modell:
 *           type: string
 *           description: Modellbezeichnung
 *           example: S-Klasse
 *         beschleunigung:
 *           type: integer
 *           description: Beschleunigung in s von 0 auf 100 km/h
 *           example: 15.7
 *         breite:
 *           type: integer
 *           description: Breite des Autos in mm
 *           example: 1500
 *         co2AusstossNEFZ:
 *           type: integer
 *           description: CO2 Ausstoss des Autos in gCO2/100km
 *           example: 500
 *         grundpreis:
 *           type: integer
 *           description: Grundpreis des Autos in Euro
 *           example: 50000
 *         hubraum:
 *           type: integer
 *           description: Hubraum in ccm
 *           example: 2458
 *         maxGeschwindigkeit:
 *           type: integer
 *           description: Die Maximalgeschwindikeit des Autos in km/h
 *           example: 178
 *         hoehe:
 *           type: integer
 *           description: Die Hoehe des Autos in mm
 *           example: 1205
 *         leistungPS:
 *           type: integer
 *           description: Die Leistung des Autos in PS
 *           example: 178
 *         motorArt:
 *           type: string
 *           description: Die Motorart des Autos
 *           example: Otto
 *         schadStoffKlasse:
 *           type: string
 *           description: Die Schadstoffklasse des Autos
 *           example: Euro 5
 *         sitzAnzahl:
 *           type: integer
 *           description: Anzahl der Sitze
 *           example: 4
 *         verbrauch:
 *           type: integer
 *           description: Spritverbrauch in l/100km
 *           example: 12.5
 *         zulGesamtGewicht:
 *           type: integer
 *           description: Zulaessiges Gesamtgewicht in kg
 *           example: 1250
 *         verbrauchGesamtNEFZ:
 *           type: integer
 *           description: verbrauchGesamtNEFZ
 *           example: 0
 *         verbrauchInnerortsNEFZ:
 *           type: integer
 *           description: verbrauchInnerortsNEFZ
 *           example: 0
 *         verbrauchAusserortsNEFZ:
 *           type: integer
 *           description: verbrauchAusserortsNEFZ
 *           example: 0
 *         wltpSehrSchnell:
 *           type: integer
 *           description: wltpSehrSchnell
 *           example: 0
 *         wltpSchnell:
 *           type: integer
 *           description: wltpSchnell
 *           example: 0
 *         wltpLangsam:
 *           type: integer
 *           description: wltpLangsam
 *           example: 0
 *         wltpKombiniert:
 *           type: integer
 *           description: wltpKombiniert
 *           example: 0
 *         hsn:
 *           type: string
 *           description: Spezifische Herstellernummer
 *           example: 0
 *         tsn:
 *           type: string
 *           description: tsn
 *           example: 0
 *         erstZulassung:
 *           type: date
 *           description: Datum der Erstzulassung
 *           example: 0
 *         fahrzeugKlasse:
 *           type: string
 *           description: fahrzeugKlasse
 *           example: 0
 *         aufbauArt:
 *           type: string
 *           description: aufbauArt
 *           example: 0
 *         bezeichnungFahrzeugKlasseAufbau:
 *           type: string
 *           description: bezeichnungFahrzeugKlasseAufbau
 *           example: 0
 *
 *     NeuesAuto:
 *       type: object
 *       required:
 *       properties:
 *         marke:
 *           type: string
 *           description: Fahrzeugmarke
 *           example: Mercedes
 *         modell:
 *           type: string
 *           description: Modellbezeichnung
 *           example: S-Klasse
 *         beschleunigung:
 *           type: integer
 *           description: Beschleunigung in s von 0 auf 100 km/h
 *           example: 15.7
 *         breite:
 *           type: integer
 *           description: Breite des Autos in mm
 *           example: 1500
 *         co2AusstossNEFZ:
 *           type: integer
 *           description: CO2 Ausstoss des Autos in gCO2/100km
 *           example: 500
 *         grundpreis:
 *           type: integer
 *           description: Grundpreis des Autos in Euro
 *           example: 50000
 *         hubraum:
 *           type: integer
 *           description: Hubraum in ccm
 *           example: 2458
 *         maxGeschwindigkeit:
 *           type: integer
 *           description: Die Maximalgeschwindikeit des Autos in km/h
 *           example: 178
 *         hoehe:
 *           type: integer
 *           description: Die Hoehe des Autos in mm
 *           example: 1205
 *         leistungPS:
 *           type: integer
 *           description: Die Leistung des Autos in PS
 *           example: 178
 *         motorArt:
 *           type: string
 *           description: Die Motorart des Autos
 *           example: Otto
 *         schadStoffKlasse:
 *           type: string
 *           description: Die Schadstoffklasse des Autos
 *           example: Euro 5
 *         sitzAnzahl:
 *           type: integer
 *           description: Anzahl der Sitze
 *           example: 4
 *         verbrauch:
 *           type: integer
 *           description: Spritverbrauch in l/100km
 *           example: 12.5
 *         zulGesamtGewicht:
 *           type: integer
 *           description: Zulaessiges Gesamtgewicht in kg
 *           example: 1250
 *         verbrauchGesamtNEFZ:
 *           type: integer
 *           description: verbrauchGesamtNEFZ
 *           example: 0
 *         verbrauchInnerortsNEFZ:
 *           type: integer
 *           description: verbrauchInnerortsNEFZ
 *           example: 0
 *         verbrauchAusserortsNEFZ:
 *           type: integer
 *           description: verbrauchAusserortsNEFZ
 *           example: 0
 *         wltpSehrSchnell:
 *           type: integer
 *           description: wltpSehrSchnell
 *           example: 0
 *         wltpSchnell:
 *           type: integer
 *           description: wltpSchnell
 *           example: 0
 *         wltpLangsam:
 *           type: integer
 *           description: wltpLangsam
 *           example: 0
 *         wltpKombiniert:
 *           type: integer
 *           description: wltpKombiniert
 *           example: 0
 *         hsn:
 *           type: string
 *           description: Spezifische Herstellernummer
 *           example: 0
 *         tsn:
 *           type: string
 *           description: tsn
 *           example: 0
 *         erstZulassung:
 *           type: date
 *           description: Datum der Erstzulassung
 *           example: 0
 *         fahrzeugKlasse:
 *           type: string
 *           description: fahrzeugKlasse
 *           example: 0
 *         aufbauArt:
 *           type: string
 *           description: aufbauArt
 *           example: 0
 *         bezeichnungFahrzeugKlasseAufbau:
 *           type: string
 *           description: bezeichnungFahrzeugKlasseAufbau
 *           example: 0
 */
var carSchema = Joi.object({
  marke: Joi.string().trim().required(),
  modell: Joi.string().trim().required(),
  beschleunigung: Joi.number().required(),
  breite: Joi.number().required(),
  co2AusstossNEFZ: Joi.number().required(),
  grundpreis: Joi.number().required(),
  hubraum: Joi.number().required(),
  maxGeschwindigkeit: Joi.number().required(),
  hoehe: Joi.number().required(),
  leistungPS: Joi.number().required(),
  motorArt: Joi.string().trim().required(),
  schadStoffKlasse: Joi.string().trim().required(),
  sitzAnzahl: Joi.number().required(),
  verbrauch: Joi.number(),
  zulGesamtGewicht: Joi.number().required(),
  verbrauchGesamtNEFZ: Joi.number().required(),
  verbrauchInnerortsNEFZ: Joi.number().required(),
  verbrauchAusserortsNEFZ: Joi.number().required(),
  wltpSehrSchnell: Joi.number().required(),
  wltpSchnell: Joi.number().required(),
  wltpLangsam: Joi.number().required(),
  wltpKombiniert: Joi.number().required(),
  hsn: Joi.string().trim().required(),
  tsn: Joi.string().trim().required(),
  erstZulassung: Joi.date(),
  fahrzeugKlasse: Joi.string().trim().required(),
  aufbauArt: Joi.string().trim().required(),
  bezeichnungFahrzeugKlasseAufbau: Joi.string().trim().required(),
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(PORT, () => {});

const url = "localhost:27017/myproject";
const db = monk(url);

const { type } = require("os");
const { parse } = require("path");
const { resolveNaptr } = require("dns");

var parser = new xml2js.Parser({ explicitArray: false });

/**
 * @swagger
 * /init:
 *   get:
 *     summary: Einlesen der XML-Datei und Laden der Daten in die MongoDB
 *     description: Die XML-Datei wird synch eingelesen und mit xml2js nach dem Auto-Schemata geparst. Bei erfolgreichem Parse-Vorgang werden alle Datensaetze in der zuvor gedroppten MongoDB neu angelegt.
 *     responses:
 *       200:
 *         description: Erfolgreiches Laden der XML Daten in die MongoDB
 *       500:
 *         description: Fehler beim Laden der XML Daten
 *
 */
app.get("/init", async (req, res) => {
  try {
    console.log("init is visited");
    loadDataFromXmlFileToDb();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /car/{id}:
 *   get:
 *     summary: Request zum Erhalt aller gespeicherten Informationen bzgl eines Autos aus der Datenbank
 *     description: Die als Parameter enthaltene Id wird in einer Monk Anfrage (findOne) an die MongoDB gestellt und das Ergebniss dem Aufrufer zurueckgeliefert
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id des angefragten Autos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *           description: JSON Response mit allen gespeicherten Informationen zum angefragten Auto
 *           content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auto'
 *       404:
 *         description: Es existiert keine Resource unter der angefragten Id
 *       500:
 *         description: Ein interner Serverfehler ist aufgetreten
 *
 */
app.get("/car/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db.get("document").findOne({
      _id: id,
    });
    if (!item) res.sendStatus(404);
    return res.json(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Gibt alle in der MongoDB gespeicherten Datensaetze zurueck
 *     description: Alle Datensaetze mit den Attributwerten id, marke, modell werden mit diesen Werten zurueck gegeben
 *     responses:
 *       200:
 *         description: Erfolgreiche Abfrage aller Datensaetze
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KurzInfoAuto'
 *       500:
 *          description: Ein interner Fehler bei Abfrage der DB
 *
 */
app.get("/cars", (req, res) => {
  try {
    var collection = db.get("document");
    var allEntriesFromDb = collection
      .find({}, "id marke modell")
      .then((docs) => {
        res.send(docs);
      });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

/**
 * @swagger
 * /new:
 *   post:
 *     summary: Anlegen eines neuen Autos.
 *     description: Im Body der Post Request muss ein gueltige JSON welche das Auto Schema erfuellt angehaengt sein. Daraufhin wird bei erfolgreicher Validierung das Auto als neuer Datensatz in die MongoDB eingepflegt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NeuesAuto'
 *     responses:
 *       200:
 *         description: Die POST Request war erfolgreich und das Auto wurde angelegt
 *       400:
 *         description: Bad Request, die Daten entsprechen nicht der Validierung
 */
app.post("/new", async (req, res) => {
  try {
    const validatedCarData = await carSchema.validateAsync(req.body);
    console.log(validatedCarData);
    var collection = db.get("document").insert(validatedCarData);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Updaten der Daten eines Datensatzes in der MongoDB
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id des angefragten Autos
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NeuesAuto'
 *     responses:
 *       201:
 *         description: Die PUT Request war erfolgreich und das Auto wurde geupdated
 *       400:
 *         description: Bad Request, die Daten entsprechen nicht der Validierung
 */
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const validatedCarData = await carSchema.validateAsync(req.body);
    console.log(validatedCarData);
    const item = await db.get("document").findOne({
      _id: id,
    });
    if (!item) res.sendStatus(404);
    const updated = await db.get("document").update(
      {
        _id: id,
      },
      {
        $set: validatedCarData,
      }
    );
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Loeschen des Datensatz-Tupels aus der MongoDB mit der angegebenen ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id des angefragten Autos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Auto wurde erfolgreich geloescht
 *       404:
 *         description: Zu der ID wurde kein Auto in der DB gefunden
 *       500:
 *         description: Ein interner Server Fehler ist aufgetreten
 */
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db.get("document").findOneAndDelete({ _id: id });
    if (!item) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// TO DO
// Function that writes the data from Db back to XML to save data persistencely

function loadDataFromXmlFileToDb() {
  try {
    db.get("document").drop(() => {});
    var collection = db.get("document");
    var textDataFromXmlFile = fs.readFileSync("./autoDatenbank.txt", {
      encoding: "utf8",
      flag: "r",
    });

    var parsedDataFromXmlFile = parser
      .parseStringPromise(textDataFromXmlFile)
      .then(function (result) {
        console.dir(result);

        result.Datenbank.Auto.forEach((element) => {
          var validateDataFromXmlFile = carSchema.validate(element);
          collection.insert(validateDataFromXmlFile.value);
        });
      });
  } catch (error) {
    console.log(error);
  }
}
