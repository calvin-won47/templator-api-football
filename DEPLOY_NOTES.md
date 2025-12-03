## SPA history fallback

When serving the Vite build with Nginx, ensure SPA history fallback is enabled so direct visits to `/blog` or `/blog/<slug>` load the app:

```
location / {
    try_files $uri $uri/ /index.html;
}
```

Apache (mod_rewrite) equivalent:

```
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

The GitHub Actions workflow now also writes `dist/blog/<slug>/index.html` during deploy, so legacy servers without a rewrite still serve the SPA for blog detail routes.
