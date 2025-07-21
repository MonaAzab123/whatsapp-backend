const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/webhook", (req, res) => {
  const verify_token = "test123"; // ضعي التوكن اللي هتكتبيه في WhatsApp

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === verify_token) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  console.log("Received webhook:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Webhook is running on port ${port}`);
});
