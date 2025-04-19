
# Webhook Viewer (Updated)

Bekijk inkomende `POST` of `GET` requests op `/hook`.  
Statische viewer op `/` toont overzicht en details van ontvangen data.

## Lokale test

```bash
npm install
npm run build
npm start
```

## Deployen op GitHub + Render

1. Upload deze map naar GitHub.
2. Ga naar [render.com](https://render.com), kies "New Web Service".
3. Selecteer de GitHub-repo.
4. Build command: `npm run build`
5. Start command: `npm run start`
