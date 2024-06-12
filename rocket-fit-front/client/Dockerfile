#--JavaScript React Frontend
#Base image, node.js runtime environment
FROM node:18.17.1

#React FrontEnd Working Directory
#WORKDIR /app

#Copy package-lock.json/package.json files from project
#COPY package.json .

#Install dependencies
#RUN npm install

#Copy contents of project
#COPY . .

#Retrieve url of backend API from environment variable
# ARG VITE_RF_API_BASE_URL
# ENV VITE_RF_API_BASE_URL=${VITE_RF_API_BASE_URL}
#RUN npm run build

#UI port number
#EXPOSE 3000

#Commands to start frontend
#CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "3000"]

#Copy package-lock.json/package.json files from project
COPY package.json .

#Install dependencies
RUN npm install

#Copy contents of project
COPY . .

#Create start script
RUN echo "npm run build && npm run serve -- --host 0.0.0.0 --port 3000" > start.sh
RUN chmod +x start.sh

#UI port number
EXPOSE 3000

#Run start script when container is started
CMD ["./start.sh"]