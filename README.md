# fresan.digital

Site da FRESAN em Next.js, exportado como site estático e publicado no GitHub Pages.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera out/
```

- Conteúdo dos apps: `app/apps.ts`. Página: `app/page.tsx`. Estilos: `app/globals.css`.
- `public/` vai para a raiz do site sem mudanças: `CNAME`, `app-ads.txt`, `.nojekyll` e as páginas
  antigas (`/aeromet/policy/`, `/aeromet/terms/`, `/c208/`), que as lojas e links externos usam.
- Deploy: todo push na `main` roda `.github/workflows/deploy.yml`. Nas configurações do
  repositório, Pages precisa estar com a fonte "GitHub Actions".
