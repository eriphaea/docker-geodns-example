FROM node:16 as builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]
