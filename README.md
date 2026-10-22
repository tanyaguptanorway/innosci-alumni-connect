# innosci-alumni-connect
An alumni management and engagement platform that connects graduates through a secure, centralized digital community.
# Run command in Frontend folder
<!--For the first time run this command-->
npm create vite@latest . -- --template react-ts 
<!-- Install Dependencies -->
npm install lucide-react
npm install tailwindcss @tailwindcss/vite
<!-- Later use below command to run react application -->
npm run dev

# Run command in Backend folder
<!-- Install dependencies -->
npm init -y
npm pkg set type=module
npm install express cors mysql2
npm pkg set "scripts.dev=node --watch --env-file=.env src/server.js"
npm pkg set "scripts.start=node --env-file=.env src/server.js"
npm pkg set "scripts.db:schema=node --env-file=.env.admin scripts/run-sql.mjs sql/schema.sql"
npm pkg set "scripts.db:user=node --env-file=.env.admin scripts/run-sql.mjs sql/app-user.sql"
npm pkg set "scripts.db:seed=node --env-file=.env.admin scripts/run-sql.mjs sql/seed.sql"
# To run db schema, user and seed
npm run db:schema
npm run db:user
npm run db:seed
<!-- Later use below command to run react application -->
npm run dev 