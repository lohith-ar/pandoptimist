##FROM openjdk:11-jre-slim
##FROM maven:3.6.0-jdk-11-slim AS build
#
#FROM node:latest
#RUN apt-get -y install default-jre
##RUN apt-get -y install default-jre
## set working directory
##WORKDIR /frontend
#RUN mkdir -p frontend
##RUN mkdir -p backend
#COPY webapp ./frontend/webapp
#COPY src ./frontend/src
#COPY pom.xml ./frontend/pom.xml
#WORKDIR ./frontend/webapp
#RUN npm install
#RUN npm run build
#WORKDIR ./frontend
##echo '******* Installing PPA pack ********'
##WORKDIR ./frontend/src/main/resources/static
#RUN echo "Folders in root-----------------------------------------------------------------------------"
#RUN echo $(ls /frontend)
##RUN echo $(ls /frontend/src/main/resources/static)
#RUN echo "Angular Done-----------------------------------------------------------------------------"
#WORKDIR .
#RUN echo $(ls /)
## Install OpenJDK-11
##RUN apt-get update && \
##    apt-get install -y openjdk-11-jre-headless && \
##    apt-get clean;# maven:3.6.0-jdk-11-slim AS build
#RUN echo "Maven Added Done-----------------------------------------------------------------------------"
##WORKDIR ./frontend
#WORKDIR .
##WORKDIR ./frontend
#RUN echo $(ls /)
#
#RUN apt-get -y install default-jre
## RUN java -version
#RUN apt -y install default-jre
#RUN apt install openjdk-11-jre-headless
#RUN java -version
#
#
#RUN mvn -f /frontend/pom.xml clean package
##
##
##
###add `/app/node_modules/.bin` to $PATH
##ENV PATH /app/node_modules/.bin:$PATH
##
### install and cache app dependencies
##
##COPY package.json /app/package.json
##RUN npm install
##
##ADD target/pandoptimist_webapp-0.0.1-SNAPSHOT.jar pandoptimist_webapp.jar
FROM openjdk:11-jre-slim
ADD target/WebAppService.jar pandoptimist-webapp.jar
EXPOSE 9097
ENTRYPOINT ["java","-jar","pandoptimist-webapp.jar"]