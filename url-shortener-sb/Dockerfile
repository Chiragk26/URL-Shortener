# -----------------------------
# Stage 1: Build the application
# -----------------------------
# Use Java 21 JDK (full development kit) for building the Spring Boot app
FROM eclipse-temurin:21-jdk AS build

# Set the working directory inside the container
WORKDIR /app

# Copy Maven wrapper files (to use ./mvnw instead of system mvn)
COPY mvnw ./
COPY .mvn/ .mvn/

# Give execute permission to the Maven wrapper script
RUN chmod +x mvnw

# Copy pom.xml to download and cache dependencies
COPY pom.xml ./

# Download all dependencies (this step speeds up builds by caching dependencies)
RUN ./mvnw dependency:go-offline

# Copy the actual source code
COPY src ./src

# Build the Spring Boot application (skip tests for faster builds)
RUN ./mvnw clean package -DskipTests


# -----------------------------
# Stage 2: Run the application
# -----------------------------
# Use a smaller Java 21 runtime image (no JDK, just JRE)
FROM eclipse-temurin:21-jre

# Set the working directory for the runtime container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 so the app can be accessed outside the container
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
