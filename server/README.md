# Product Catalog Server

Spring Boot 3 REST API backend for the Product Catalog e-commerce application.

---

## Overview

A production-ready backend service providing product management APIs with database persistence, validation, and error handling.

**Framework**: Spring Boot 3.3.13  
**Language**: Java 21  
**Build Tool**: Gradle  
**Database**: PostgreSQL  
**ORM**: Spring Data JPA with Flyway migrations

---

## Requirements

- **Java**: 21 or higher
- **Gradle**: 8.0 or higher (included via Gradle Wrapper)
- **PostgreSQL**: 12 or higher
- **Memory**: 512 MB minimum

---

## Quick Start

### 1. Setup Environment

#### Windows (PowerShell)

```powershell
# Set Java Home
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

# Database Configuration (optional - defaults shown)
$env:DB_URL = "jdbc:postgresql://localhost:5432/product_catalog"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "postgres"
$env:SERVER_PORT = "8080"
```

#### macOS/Linux

```bash
# Set environment variables (add to ~/.bash_profile or ~/.zshrc)
export JAVA_HOME=/path/to/java21
export PATH=$JAVA_HOME/bin:$PATH

# Database Configuration (optional)
export DB_URL="jdbc:postgresql://localhost:5432/product_catalog"
export DB_USERNAME="postgres"
export DB_PASSWORD="postgres"
export SERVER_PORT="8080"
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb product_catalog

# Or use psql
psql -U postgres -c "CREATE DATABASE product_catalog;"
```

### 3. Run the Server

```bash
cd server
./gradlew bootRun
```

The server starts at `http://localhost:8080`

---

## Health Check

Verify the server is running:

```bash
curl http://localhost:8080/api/v1/health
```

**Response** (200 OK):

```json
{
  "status": "UP"
}
```

---

## API Endpoints

### Base URL

```
http://localhost:8080/api/v1
```

### Products

#### 1. Get All Products

```http
GET /products
```

**Response** (200 OK):

```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": 29.99,
    "stock": 100,
    "thumbnailUrl": "https://example.com/image.jpg",
    "createdAt": "2024-06-11T10:00:00Z"
  }
]
```

#### 2. Get Product by ID

```http
GET /products/{id}
```

**Path Parameters**:

- `id` (number, required): Product ID (must be positive)

**Response** (200 OK):

```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "stock": 100,
  "thumbnailUrl": "https://example.com/image.jpg",
  "createdAt": "2024-06-11T10:00:00Z"
}
```

**Error Responses**:

- 404 Not Found: Product does not exist
- 400 Bad Request: Invalid product ID format

---

## Configuration

### Environment Variables

| Variable      | Default                                            | Description               |
| ------------- | -------------------------------------------------- | ------------------------- |
| `DB_URL`      | `jdbc:postgresql://localhost:5432/product_catalog` | PostgreSQL connection URL |
| `DB_USERNAME` | `postgres`                                         | Database user             |
| `DB_PASSWORD` | `postgres`                                         | Database password         |
| `SERVER_PORT` | `8080`                                             | Server port               |

### Application Properties

Located in `src/main/resources/application.yml`:

```yaml
server:
  port: ${SERVER_PORT:8080}

spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

  flyway:
    enabled: true
    locations: classpath:db/migration
```

---

## Project Structure

```
server/
├── build.gradle                          # Build configuration
├── settings.gradle
├── gradlew / gradlew.bat                # Gradle wrapper
├── README.md                            # This file
├── .env.example                         # Environment variables template
│
└── src/
    ├── main/
    │   ├── java/com/productcatalog/
    │   │   ├── ProductCatalogServerApplication.java    # Entry point
    │   │   │
    │   │   ├── product/                                # Product module
    │   │   │   ├── Product.java                        # JPA Entity
    │   │   │   ├── ProductResponse.java                # Response DTO
    │   │   │   ├── ProductRequest.java                 # Request DTO
    │   │   │   ├── ProductController.java              # REST endpoints
    │   │   │   ├── ProductService.java                 # Business logic
    │   │   │   ├── ProductRepository.java              # Data access
    │   │   │   ├── ProductMapper.java                  # DTO mapping
    │   │   │   └── ProductNotFoundException.java       # Custom exception
    │   │   │
    │   │   └── common/                                 # Shared utilities
    │   │       ├── HealthController.java               # Health check endpoint
    │   │       ├── GlobalExceptionHandler.java         # Exception handling
    │   │       └── ErrorResponse.java                  # Error response format
    │   │
    │   └── resources/
    │       ├── application.yml                         # Application config
    │       └── db/migration/                           # Flyway migrations
    │           └── V1__create_products_table.sql
    │
    └── test/
        └── java/com/productcatalog/              # Unit & Integration tests
```

---

## Architecture

### Layered Architecture

```
┌─────────────────────────────┐
│    REST Controller Layer    │  (ProductController)
├─────────────────────────────┤
│    Service Layer            │  (ProductService)
├─────────────────────────────┤
│    Repository Layer         │  (ProductRepository)
├─────────────────────────────┤
│    Database Layer           │  (PostgreSQL)
└─────────────────────────────┘
```

### Key Components

#### ProductController

- REST endpoint definitions
- Request validation
- Response formatting

#### ProductService

- Business logic
- Data processing
- Exception handling

#### ProductRepository

- Spring Data JPA interface
- Database queries
- Transaction management

#### ProductMapper

- DTO conversion
- Entity mapping
- Data transformation

---

## Database Schema

### Products Table

```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR(160) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  stock INTEGER NOT NULL,
  thumbnail_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  CONSTRAINT products_price_min CHECK (price >= 0),
  CONSTRAINT products_stock_min CHECK (stock >= 0)
);
```

### Constraints

- **name**: Required, max 160 characters
- **description**: Required, max 1000 characters
- **price**: Required, >= 0, decimal precision 12.2
- **stock**: Required, >= 0
- **thumbnail_url**: Required, max 500 characters (URL format)
- **created_at**: Auto-generated timestamp

---

## Data Validation

### Product Entity Validation

| Field        | Validation                    | Error                             |
| ------------ | ----------------------------- | --------------------------------- |
| name         | @NotBlank, @Size(max=160)     | Must not be blank, max 160 chars  |
| description  | @NotBlank, @Size(max=1000)    | Must not be blank, max 1000 chars |
| price        | @NotNull, @DecimalMin("0.00") | Must not be null, must be >= 0    |
| stock        | @NotNull, @Min(0)             | Must not be null, must be >= 0    |
| thumbnailUrl | @NotBlank, @Size(max=500)     | Must not be blank, max 500 chars  |

### API Validation

- **Product ID**: Must be a positive number
- **Request parameters**: Validated before processing
- **Response**: Always validated before returning

---

## Error Handling

### Global Exception Handler

All exceptions are caught and formatted consistently:

**Response Format** (4xx/5xx):

```json
{
  "status": 400,
  "message": "Error message",
  "timestamp": "2024-06-11T10:00:00Z"
}
```

### Common Error Responses

| Status | Error                 | Cause                             |
| ------ | --------------------- | --------------------------------- |
| 400    | Bad Request           | Invalid product ID (not positive) |
| 404    | Not Found             | Product doesn't exist             |
| 500    | Internal Server Error | Unexpected server error           |

---

## Database Migrations

### Flyway

Database schema is managed with Flyway for version control.

**Migration Files**: `src/main/resources/db/migration/`

**Naming Convention**: `V[version]__[description].sql`

### Running Migrations

Migrations run automatically on application startup.

**To reset Flyway** (if needed):

```bash
# Clean database (WARNING: This deletes all data)
./gradlew flywayClean

# Redo migrations
./gradlew flywayMigrate
```

**Troubleshooting Checksum Mismatch**:

```
If Flyway reports a checksum mismatch:
1. Ensure you're using a fresh database for this project
2. Or repair Flyway history (only if sure schema is correct)
3. Contact development team for guidance
```

---

## Dependencies

### Core Dependencies

- **spring-boot-starter-web**: REST API support
- **spring-boot-starter-data-jpa**: ORM and database access
- **spring-boot-starter-validation**: Bean validation
- **postgresql**: PostgreSQL JDBC driver
- **flyway**: Database migrations

### Development Dependencies

- **lombok**: Reduce boilerplate code
- **spring-boot-starter-test**: Testing framework

---

## Build & Testing

### Build

```bash
# Build without running
./gradlew build

# Skip tests during build
./gradlew build -x test
```

### Testing

```bash
# Run all tests
./gradlew test

# Run specific test class
./gradlew test --tests ProductServiceTest

# Run with coverage
./gradlew test jacocoTestReport
```

### Clean

```bash
# Remove build artifacts
./gradlew clean
```

---

## Troubleshooting

### Issue: `JAVA_HOME not set`

**Solution**: Set JAVA_HOME environment variable to Java 21 installation path

### Issue: `Database connection refused`

**Solution**:

1. Ensure PostgreSQL is running
2. Verify database exists: `psql -l`
3. Check credentials in environment variables
4. Check connection string in application.yml

### Issue: `Port 8080 already in use`

**Solution**: Change port with environment variable

```bash
$env:SERVER_PORT = "8081"
./gradlew bootRun
```

### Issue: `Flyway checksum mismatch`

**Solution**:

1. Use a fresh database
2. Or manually fix migration history in PostgreSQL
3. Contact dev team for safe resolution

### Issue: `Gradle wrapper permission denied` (macOS/Linux)

**Solution**:

```bash
chmod +x gradlew
./gradlew bootRun
```

---

## Performance Considerations

### Optimization Features

- **Connection Pooling**: Automatic via Spring Data JPA
- **Query Optimization**: JPA handles efficient queries
- **Caching**: Can be added for frequently accessed data
- **Pagination**: Can be added for large datasets

### Best Practices

- Always validate input data
- Use database indexes for frequently queried fields
- Monitor database connection pool
- Log performance metrics in production

---

## Security Considerations

### Current Implementation

- Input validation on all endpoints
- Exception handling without exposing internals
- Type-safe database access (no SQL injection)

### Future Enhancements

- CORS configuration for frontend access
- Authentication and authorization
- Rate limiting
- HTTPS enforcement
- API documentation (Swagger/OpenAPI)

---

## CORS Configuration

**Frontend URL**: `http://localhost:5173`

If CORS errors occur, add to `application.yml`:

```yaml
spring:
  web:
    cors:
      allowed-origins: 'http://localhost:5173'
      allowed-methods: GET, POST, PUT, DELETE, OPTIONS
      allowed-headers: '*'
      max-age: 3600
```

---

## Deployment

### Production Checklist

- [ ] Use environment variables for all configuration
- [ ] Database backup strategy in place
- [ ] Monitor application logs
- [ ] Set appropriate JVM heap memory
- [ ] Enable security features (CORS, HTTPS)
- [ ] Run database migrations on deployment
- [ ] Test API endpoints after deployment

### Building JAR for Deployment

```bash
./gradlew bootJar

# JAR file created at: build/libs/product-catalog-server-0.0.1-SNAPSHOT.jar

# Run JAR
java -jar build/libs/product-catalog-server-0.0.1-SNAPSHOT.jar
```

---

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/add-new-endpoint
```

### 2. Make Changes

- Add/modify Java files
- Update database migrations if needed
- Add tests

### 3. Build & Test

```bash
./gradlew build
```

### 4. Commit & Push

```bash
git add .
git commit -m "feat: add new endpoint"
git push origin feature/add-new-endpoint
```

### 5. Create Pull Request

- Describe changes
- Link to issues
- Request review

---

## Contributing Guidelines

### Code Style

- Follow Google Java Style Guide
- Use meaningful variable names
- Add comments for complex logic
- Keep methods focused and small

### Testing Requirements

- Write unit tests for services
- Write integration tests for endpoints
- Maintain >70% code coverage
- Test error scenarios

### Documentation

- Update this README for API changes
- Add JavaDoc to public methods
- Document breaking changes
- Add migration notes if DB schema changes

---

## Useful Commands

```bash
# View logs
./gradlew bootRun --info

# Format code
./gradlew spotlessApply

# Static analysis
./gradlew checkstyleMain

# Check dependencies
./gradlew dependencies

# Update dependencies
./gradlew dependencyUpdates
```

---

## API Documentation

For complete API documentation, see the frontend README at `../README.md`

---

## Support & Resources

- **Spring Boot Docs**: https://spring.io/projects/spring-boot
- **Spring Data JPA**: https://spring.io/projects/spring-data-jpa
- **Flyway**: https://flywaydb.org/documentation/
- **PostgreSQL**: https://www.postgresql.org/docs/

---

## Changelog

| Date          | Version | Changes                     |
| ------------- | ------- | --------------------------- |
| June 11, 2024 | 1.0.0   | Initial backend setup       |
|               |         | - Product API endpoints     |
|               |         | - PostgreSQL integration    |
|               |         | - Flyway migrations         |
|               |         | - Global exception handling |

---

**Version**: 1.0.0  
**Last Updated**: June 11, 2024  
**Status**: Production Ready ✓
