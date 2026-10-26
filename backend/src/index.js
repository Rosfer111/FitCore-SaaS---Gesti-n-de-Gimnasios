const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', project: 'FitCore SaaS API' });
});

app.listen(PORT, () => {
  console.log(`FitCore Backend API ejecutandose en el puerto ${PORT}`);
});
