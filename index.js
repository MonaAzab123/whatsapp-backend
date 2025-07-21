export default function handler(req, res) {
  const VERIFY_TOKEN = "test123"; // نفس التوكن اللي كتبتيه في Meta

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
  } else {
    res.status(200).send("OK");
  }
}
