export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método inválido" });
  }

  const { nick, email } = req.body;

  const webhook = process.env.WEBHOOK_URL;

  if (!webhook) {
    return res.status(500).json({ error: "Webhook não configurada" });
  }

  try {

    const r = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content:
          `Novo cliente aceitou os termos\nNick: ${nick}\nEmail: ${email}`
      })
    });

    if (r.ok) {
      res.status(200).json({ ok: true });
    } else {
      res.status(500).json({ error: "Erro ao enviar webhook" });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}