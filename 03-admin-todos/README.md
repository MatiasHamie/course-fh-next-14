# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```bash
docker compose up -d
```

2. Crear una copia del .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando de `npm install`
5. Ejecutar el comando de `npm run dev`
6. Ejecutar estos comandos de prisma

```bash
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el /seed para [crear la base de datos](localhost:3000/api/seed)

# Nota: Usuario por defecto

**usuario:** test1@google.com
**password:** 123456

## Prisma Commands

```bash
npx prisma init
npx prisma migrate dev
npx prisma generate
```

## Staging
