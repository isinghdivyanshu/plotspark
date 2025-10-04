# Stage 1: Build the application using a multi-platform image
# This image works on both ARM64 (Apple Silicon) and AMD64 (Intel/AMD)
FROM maven:3.9-eclipse-temurin-21 AS build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml to leverage Docker layer caching
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the application, skipping tests for a faster build
RUN ./mvnw package -DskipTests

# Stage 2: Create the final, smaller, multi-platform image
FROM eclipse-temurin:21-jre-jammy

# Set the working directory
WORKDIR /app

# Create a non-root user and group for the application
RUN addgroup --system --gid 10001 appgroup && \
    adduser --system --uid 10001 --ingroup appgroup --no-create-home appuser

# Copy the JAR file from the build stage and set ownership
COPY --from=build --chown=appuser:appgroup /app/target/*.jar app.jar

# Run the application as a non-root user
USER appuser

# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]