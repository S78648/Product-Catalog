# 🛒 Product Catalog

A modern, full-stack e-commerce product showcase application with real-time shopping cart functionality.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Product Catalog** is a production-ready e-commerce platform designed to showcase products with an intuitive shopping experience. It features a modern React frontend with real-time cart management and a robust Spring Boot backend API.

### Key Highlights

- ⚡ **Real-time Cart Updates**: Instant visual feedback on cart actions
- 🎯 **Responsive Design**: Works seamlessly on desktop and mobile
- 🔒 **Type-Safe**: Full TypeScript and Java implementation
- 📦 **Production Ready**: Comprehensive error handling and validation
- 🚀 **Fast & Scalable**: Optimized performance and database design

---

## Features

### 🎨 Frontend Features

- **Product Listing**: Browse all available products with images and details
- **Product Details**: View comprehensive product information
- **Real-time Cart**:
  - Expandable quantity selector on product cards
  - Instant cart badge updates in navbar
  - Real-time quantity adjustments
  - Stock validation and limits
- **Responsive UI**: Tailwind CSS-powered responsive design
- **Client-side Routing**: Smooth navigation between pages

### 🔧 Backend Features

- **RESTful API**: Clean, well-documented endpoints
- **Product Management**: Get all products and individual product details
- **Data Validation**: Comprehensive input and business logic validation
- **Error Handling**: Global exception handling with consistent error responses
- **Database**: PostgreSQL with Flyway migrations for schema versioning
- **Health Check**: API health monitoring endpoint

---

## Tech Stack

### Frontend

| Technology   | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19.1.0  | UI Framework            |
| TypeScript   | 5.8.3   | Type Safety             |
| React Router | 7.6.2   | Client-side Routing     |
| Zustand      | Latest  | State Management        |
| Tailwind CSS | 3.4.17  | Styling                 |
| Vite         | 6.3.5   | Build Tool & Dev Server |
| Axios        | 1.9.0   | HTTP Client             |
| React Query  | 5.80.6  | Data Fetching & Caching |

### Backend

| Technology      | Version | Purpose            |
| --------------- | ------- | ------------------ |
| Spring Boot     | 3.3.13  | Framework          |
| Java            | 21      | Language           |
| Spring Data JPA | 3.3.13  | ORM                |
| PostgreSQL      | 12+     | Database           |
| Flyway          | Latest  | Migrations         |
| Gradle          | 8.0+    | Build Tool         |
| Lombok          | Latest  | Reduce Boilerplate |

### DevOps & Tools

- **Git**: Version control
- **GitHub**: Repository hosting
- **Gradle Wrapper**: Platform-independent builds
- **ESLint & Prettier**: Code quality (Frontend)

---

## Project Structure

```
Product-Catalog/
├── 📁 src/                              # Frontend source code
│   ├── 📁 hooks/                        # Custom React hooks
│   │   └── useCart.ts                   # Cart state management (Zustand)
│   ├── 📁 components/                   # Shared components
│   │   ├── CartIcon.tsx                 # Cart badge in navbar
│   │   ├── Navbar.tsx                   # Top navigation
│   │   └── Footer.tsx                   # Footer section
│   ├── 📁 features/products/            # Product feature module
│   │   ├── components/
│   │   │   ├── ProductCard.tsx          # Product card display
│   │   │   └── ProductCardFooter.tsx    # Quantity selector
│   │   ├── pages/
│   │   │   ├── ProductListPage.tsx      # Products listing
│   │   │   └── ProductDetailPage.tsx    # Product details
│   │   ├── types/
│   │   │   └── product.ts               # Product type definitions
│   │   └── hooks/
│   │       └── useProduct.ts            # Product data fetching
│   ├── 📁 layouts/
│   │   └── AppLayout.tsx                # Main layout wrapper
│   ├── main.tsx                         # Entry point
│   └── index.css                        # Global styles
│
├── 📁 server/                           # Backend source code
│   ├── 📁 src/main/java/
│   │   └── 📁 com/productcatalog/
│   │       ├── ProductCatalogServerApplication.java    # Main class
│   │       ├── 📁 product/                             # Product module
│   │       │   ├── Product.java                        # Entity
│   │       │   ├── ProductResponse.java                # Response DTO
│   │       │   ├── ProductRequest.java                 # Request DTO
│   │       │   ├── ProductController.java              # REST API
│   │       │   ├── ProductService.java                 # Business logic
│   │       │   ├── ProductRepository.java              # Data access
│   │       │   ├── ProductMapper.java                  # DTO mapping
│   │       │   └── ProductNotFoundException.java       # Exception
│   │       └── 📁 common/                              # Shared utilities
│   │           ├── HealthController.java               # Health check
│   │           ├── GlobalExceptionHandler.java         # Exception handling
│   │           └── ErrorResponse.java                  # Error format
│   ├── 📁 src/main/resources/
│   │   ├── application.yml               # Configuration
│   │   └── db/migration/                # Flyway migrations
│   └── build.gradle                     # Build configuration
│
├── 📄 FEATURES.md                       # Detailed feature documentation
├── 📄 IMPLEMENTATION.md                 # Implementation guide
├── 📄 QUICKSTART.md                     # Quick start guide
├── 📄 README.md                         # This file
├── 📄 vite.config.ts                    # Frontend build config
├── 📄 tailwind.config.ts                # Tailwind configuration
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 package.json                      # Frontend dependencies
└── 📄 package-lock.json                 # Dependency lock file
```

---

## Getting Started

### Prerequisites

#### Frontend

- Node.js 16 or higher
- npm or yarn

#### Backend

- Java 21 or higher
- PostgreSQL 12 or higher
- Gradle (included via wrapper)

### Installation

#### 1. Clone the Repository

```bash
git clone git@github.com:S78648/Product-Catalog.git
cd Product-Catalog
```

#### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

#### 3. Backend Setup

```bash
cd server

# Set environment variables (PowerShell - Windows)
$env:DB_URL = "jdbc:postgresql://localhost:5432/product_catalog"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "postgres"

# Or on macOS/Linux
export DB_URL="jdbc:postgresql://localhost:5432/product_catalog"
export DB_USERNAME="postgres"
export DB_PASSWORD="postgres"

# Create database
createdb product_catalog

# Start server
./gradlew bootRun
```

Backend runs at: `http://localhost:8080`

#### 4. Verify Setup

```bash
# Check frontend
curl http://localhost:5173

# Check backend health
curl http://localhost:8080/api/v1/health
```

---

## Usage

### Browsing Products

1. Open frontend at `http://localhost:5173`
2. Navigate to `/products` page
3. View all available products with details

### Adding to Cart

1. Click `+` button on any product card
2. See footer expand with quantity controls
3. Adjust quantity with `−` and `+` buttons
4. Cart badge in navbar updates in real-time

### Viewing Product Details

1. Click on any product name or image
2. View complete product information
3. Use quantity selector to adjust items
4. Changes sync with cart immediately

---

## API Documentation

### Frontend API Integration

**Base URL**: `http://localhost:8080/api/v1`

**Endpoints**:

- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID

For complete API documentation, see [Backend README](./server/README.md#api-endpoints)

### Cart State Management

**Hook**: `useCart()` - Zustand-based global state

**Methods**:

```typescript
const { items, totalCount, addItem, removeItem, updateQuantity } = useCart();
```

---

## Documentation

Comprehensive documentation is available in the following files:

| Document                                 | Purpose                            |
| ---------------------------------------- | ---------------------------------- |
| [QUICKSTART.md](./QUICKSTART.md)         | Quick start guide for new users    |
| [FEATURES.md](./FEATURES.md)             | Detailed feature documentation     |
| [IMPLEMENTATION.md](./IMPLEMENTATION.md) | Implementation guide and decisions |
| [server/README.md](./server/README.md)   | Backend API documentation          |

---

## Available Scripts

### Frontend

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

### Backend

```bash
./gradlew bootRun          # Start development server
./gradlew build            # Build project
./gradlew test             # Run tests
./gradlew clean            # Clean build artifacts
./gradlew flywayMigrate    # Run database migrations
```

---

## Architecture

### Frontend Architecture

```
React Components
    ↓
Zustand Store (useCart)
    ↓
Axios HTTP Client
    ↓
REST API Endpoints
```

### Backend Architecture

```
REST Controllers
    ↓
Service Layer
    ↓
Repository Layer (Spring Data JPA)
    ↓
PostgreSQL Database
```

---

## Key Features Implementation

### Real-time Cart System

- Uses Zustand for state management
- CartIcon component displays total count
- ProductCardFooter manages quantities
- Updates propagate across all components

### Product Management

- Spring Boot REST API
- Spring Data JPA with PostgreSQL
- Comprehensive validation
- Global exception handling

### Frontend Routing

- React Router v7 for client-side navigation
- Separate pages for product list and details
- AppLayout wrapper for consistent UI

---

## Performance Optimizations

### Frontend

- Lazy loading for product images
- Code splitting with React Router
- Tree shaking for unused code
- Vite for fast build and dev server

### Backend

- Connection pooling via Spring Data JPA
- Query optimization
- Database indexing ready
- Efficient response DTOs

---

## Testing

### Frontend

```bash
# Tests will be available in future updates
npm run test
```

### Backend

```bash
./gradlew test
```

---

## Troubleshooting

### Common Issues

**Port Already in Use**

```bash
# Change port (frontend)
npm run dev -- --port 5174

# Change port (backend)
export SERVER_PORT=8081
./gradlew bootRun
```

**Database Connection Error**

- Ensure PostgreSQL is running
- Verify credentials
- Check database exists

**Node/Java Version Issues**

- Frontend: Node.js 16+
- Backend: Java 21+

See detailed troubleshooting in [QUICKSTART.md](./QUICKSTART.md#troubleshooting-guide)

---

## Contributing

### Branch Strategy

- `main` - Production ready code
- `documentation` - Documentation updates
- `feature/*` - New features
- `bugfix/*` - Bug fixes

### Steps to Contribute

1. Create a feature branch
2. Make your changes
3. Write tests
4. Update documentation
5. Submit pull request

See [IMPLEMENTATION.md](./IMPLEMENTATION.md#contributing) for detailed guidelines.

---

## Deployment

### Frontend Deployment

```bash
npm run build
# Deploy dist/ folder to hosting service
```

### Backend Deployment

```bash
./gradlew bootJar
# Deploy JAR to application server
```

---

## Environment Variables

### Frontend

No environment variables required for local development.

### Backend

```
DB_URL=jdbc:postgresql://localhost:5432/product_catalog
DB_USERNAME=postgres
DB_PASSWORD=postgres
SERVER_PORT=8080
```

---

## License

This project is licensed under the MIT License.

---

## Version History

| Version | Date          | Status     |
| ------- | ------------- | ---------- |
| 1.0.0   | June 11, 2024 | Released ✓ |

---

## Support

For issues, questions, or suggestions:

1. Check documentation files
2. Review code comments
3. Open an issue on GitHub

---

## Authors

- **Development Team**: Built with ❤️

---

## Acknowledgments

- Spring Boot for the excellent framework
- React community for amazing tools
- Tailwind CSS for styling utilities
- All open-source contributors

---

**Made with ❤️ for developers**

Last Updated: June 11, 2024
