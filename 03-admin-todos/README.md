# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```bash
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutra el /seed para [crear la base de datos](localhost:3000/api/seed)

## Prod

```bash
npx prisma init
npx prisma migrate dev
npx prisma generate
```

## Staging
