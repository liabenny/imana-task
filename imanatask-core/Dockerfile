FROM openjdk:11
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD ./mvnw spring-boot:run -Drun.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8080"
