#--JavaScript React Frontend
#Base image, node.js runtime environment
FROM node:18.17.1

#React FrontEnd Working Directory
WORKDIR /app

#Copy package-lock.json/package.json files from project
COPY package.json .

#Install dependencies
RUN npm install

#Copy contents of project
COPY . .

#UI port number
EXPOSE 3000

#Commands to build and start frontend
CMD ["npm", "run", "serve"]