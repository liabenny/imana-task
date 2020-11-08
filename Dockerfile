FROM openjdk:11
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD ["./mvnw", "spring-boot:run"]
