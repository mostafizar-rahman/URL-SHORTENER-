const express = require("express");
const URL = require("../schemes/urlSchema");
const router = express.Router();
const { nanoid } = require("nanoid");

//---------- Post url
router.post("/", async (req, res) => {
  const hostURL = req.protocol + "://" + req.get("host") + req.originalUrl;

  const { mainURL, deviceId } = req.body;
  console.log(mainURL, deviceId);
  const shortId = nanoid(8);
  const newUrl = new URL({ shortId, mainURL, hostURL, deviceId });

  try {
    const url = await newUrl.save();
    res.status(200).send({
      status: "Success",
      data: url,
    });
  } catch (error) {
    res.status(400).send({
      status: "File",
      error: error.message,
    });
  }
});

//-------- Find all url
router.get("/", async (req, res) => {
  try {
    const url = await URL.find({});
    res.send(url);
  } catch (error) {
    res.status(400).send({
      status: "Fial",
      message: error,
    });
  }
});

// ----- Redirect orginal url
router.get("/:sortId", async (req, res) => {
  const shortId = req.params.sortId;

  try {
    const url = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          vistHistory: {
            timeStamp: Date.now(),
          },
        },
      }
    );

    // const url = await URL.findOne({ shortId });
    res.redirect(url.mainURL);
  } catch (error) {
    res.status(400).send({
      status: "Fial",
      message: error.message,
    });
  }
});

// ---------- Delete url
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await URL.deleteOne({ _id: id });
    res.status(200).send({
      status: "Success",
      data,
    });
  } catch (error) {
    res.status(400).send({
      status: "Fial",
      message: error.message,
    });
  }
});

module.exports = router;
