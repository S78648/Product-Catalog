# Product Catalog Server

Spring Boot 3 backend for the Product Catalog application.

## Requirements

- Java 21
- Gradle
- PostgreSQL

## Run

```bash
cd server
gradle bootRun
```

The health endpoint is available at:

```text
GET http://localhost:8080/api/v1/health
```

Expected response:

```json
{
  "status": "UP"
}
```

## Configuration

The app uses these environment variables, with local defaults:

```text
DB_URL=jdbc:postgresql://localhost:5432/product_catalog
DB_USERNAME=postgres
DB_PASSWORD=postgres
SERVER_PORT=8080
```

On Windows PowerShell:

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
$env:DB_URL = "jdbc:postgresql://localhost:5432/product_catalog"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "postgres"
gradle bootRun
```

If Flyway reports a checksum mismatch, the app is pointed at a database that
already has a different `V1` migration in `flyway_schema_history`. Use a fresh
database for this project, or repair/reset Flyway history only if you are sure
the existing schema belongs to this app.
