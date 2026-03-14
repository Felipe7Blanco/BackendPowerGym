# 💪 PowerGym API

> **Backend robusto para gimnasios modernos** — Gestión de usuarios, membresías, suplementos, facturación y autenticación segura con JWT.

[![NestJS](https://img.shields.io/badge/NestJS-✓-red?logo=nestjs&logoColor=white)](https://nestjs.com/)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-336791?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens)
![TypeORM](https://img.shields.io/badge/TypeORM-✓-CC2222?logo=typeorm&logoColor=white)

---

## 📌 Descripción

**PowerGym API** es el motor de backend para una plataforma integral de gimnasio, diseñada para digitalizar procesos clave:
- ✅ Registro y autenticación de usuarios (clientes y administradores)
- 🧾 Generación automática de **facturas** por membresías y suplementos
- 🛒 Catálogo y gestión de **productos** (suplementos)
- 📋 Control de **membresías**, accesos y roles
- 🔐 Autenticación segura con **JWT + Bcrypt + SHA-512**

Ideal para emprendimientos fitness que buscan automatizar pagos, control de inventario y experiencia de usuario —todo desde una API limpia, escalable y bien estructurada.

---

## 🧰 Tecnologías

| Capa              | Tecnología                        |
|-------------------|-----------------------------------|
| **Framework**     | [NestJS](https://nestjs.com/)     |
| **Lenguaje**      | TypeScript                        |
| **Base de datos** | PostgreSQL (vía pgAdmin4)         |
| **ORM**           | TypeORM                           |
| **Autenticación** | JWT (Access + Refresh tokens*)    |
| **Hashing**       | `bcrypt` + `SHA-512` (doble capa)|
| **Validación**    | `class-validator` + Pipes         |
| **Estructura**    | Arquitectura limpia (Controllers → Services → Repositories) |

> ✨ *Refresh tokens: pendientes para próxima iteración (en roadmap).*

---

## 🗂️ Entidades principales

| Entidad            | Descripción                                  |
|--------------------|----------------------------------------------|
| `User`             | Datos personales del socio (nombre, EPS, etc.) |
| `Role`             | `1: Admin`, `2: Client`                      |
| `Access`           | Credenciales: email + contraseña (hasheada) |
| `Membership`       | Planes de mensualidad (básico, premium, etc.) |
| `Product`          | Suplementos disponibles (whey, creatina, etc.) |
| `Bill`             | Factura (fecha, total, estado)               |
| `BillDetail`       | Productos/membresías incluidos en la factura |
| `UserMembership`   | Relación N:N entre usuarios y membresías    |

---

## 🔐 Seguridad que inspira confianza

- Contraseñas **hasheadas con bcrypt + SHA-512** (doble protección)
- Roles y permisos: rutas protegidas según rol (`@Roles('admin')`, `@Roles('client')`)
- Validación robusta de entradas con `class-validator`
- JWT con firma segura (`HS256` o `RS256` — configurable)

> 🎯 *"Me enorgullece la capa de seguridad: no solo protege datos, sino que diseña una experiencia confiable desde el primer login."*

---

## 🚀 Cómo probarla (con Postman)

### 1. Registro de usuario (admin o cliente)
```http
POST http://localhost:3550/register/add
Content-Type: application/json
```
#### Body registrar usuario
```JSON
{
  "nameUser": "Felipe",
  "LastNameUser": "Gómez",
  "identificationUser": "1000000000",
  "phoneUser": "+57 3123123123",
  "dateUser": "1995-12-01",
  "epsUser": "SALUD COLOMBIA",
  "genderUser": 1,
  "medicalHistoryUser": "Ninguna",
  "statusUser": 1,
  "idRolUser": 1,
  "nameAcces": "felipe@gym.com",
  "passwordAccess": "SecurePass123!",
  "statusAcces": 1
}
```
### 2. Login
```http
POST http://localhost:3550/auth/login
Content-Type: application/json
```
#### Body login
```JSON
{
  "email": "felipe@gym.com",
  "password": "SecurePass123!"
}
```
## Estructura del proyecto
src/
├── auth/             # JWT, guards, strategies
├── users/            # CRUD + DTOs + Entities
├── roles/            # Roles y permisos
├── access/           # Credenciales y hashing
├── memberships/      # Planes de gym
├── products/         # Suplementos
├── bills/            # Facturas y detalles
├── shared/           # Pipes, filters, utils
└── app.module.ts

✅ Código limpio, modular y fácil de extender.

## 🛠️ Próximos pasos (Roadmap)
- Validación por email con tokens de confirmación
- Integración con pasarelas de pago (Stripe / MercadoPago)
- Documentación OpenAPI/Swagger automática
- Refresh tokens y rotación segura
- Seed automático para entornos de desarrollo



