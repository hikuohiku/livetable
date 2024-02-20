## Migration
`./node_modules/.bin/dotenv -e .env.local -- yarn prisma migrate dev --name <migration-name>`

ref: https://www.prisma.io/docs/orm/more/development-environment/environment-variables/using-multiple-env-files