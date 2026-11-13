# FitCore SaaS - Plataforma de Gestión para Pequeños Gimnasios

Repositorio oficial del proyecto intermodular **FitCore** (2º DAW). Contiene la arquitectura base y el entornado local contenerizado mediante Docker y Docker Compose.

## Integrantes del Equipo
- Fernando Rosón de Mesa
- Eamonn S. Fitzgerald Valenzuela

## Requisitos Previos
- **Git** instalado en el sistema.
- **Docker Desktop** (o Docker Engine + Docker Compose v2) activo y en ejecución.

## Guía Paso a Paso para Levantar el Entornado en Local

1. **Clonar el repositorio:**
   git clone https://github.com/Rosfer111/FitCore-SaaS---Gesti-n-de-Gimnasios.git
   cd FitCore-SaaS---Gesti-n-de-Gimnasios

2. **Configurar las variables de entorno:**
   Copiar la plantilla .env.example para generar el fichero .env local:
   cp .env.example .env

3. **Construir y levantar los contenedores en segundo plano:**
   docker compose up -d --build

4. **Verificar el estado de los servicios:**
   docker compose ps

5. **Accesos locales disponibles:**
   - **Aplicación Web (Frontend):** http://localhost:5173
   - **API REST (Backend Healthcheck):** http://localhost:3000/api/health
   - **Base de Datos MySQL:** localhost:3306

6. **Detener el entorno:**
   docker compose down

## Alcance actual

Esta entrega configura el entorno base de desarrollo. El backend expone el endpoint de comprobación `GET /api/health` y el frontend sirve una página inicial estática; las funcionalidades de gestión se incorporarán en tareas posteriores.

## Planificación temporal

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title       Planificación Temporal FitCore - Desarrollo e Integración
    
    section Planificación y Diseño
    Plan de Trabajo y EDT               :done, 2026-10-05, 2026-10-19
    Matriz Riesgos y Tarea 6            :done, 2026-10-26, 2026-11-16
    Hito 2: Plan de Trabajo             :milestone, 2026-11-16, 0d
    
    section Arquitectura y Desarrollo
    Arquitectura y Base de Datos        :active, 2026-11-23, 2026-12-14
    API REST y Autenticación Backend    :2026-12-14, 2026-12-28
    Frontend UI/UX Calendario/Dash      :2026-12-21, 2027-01-11
    Hito 3: Diseño Integral             :milestone, 2027-01-18, 0d
    
    section Pruebas, Integración y FCT
    Pruebas de Integración (QA)         :2027-01-11, 2027-01-21
    Inicio FCT (Prácticas Empresa)      :milestone, 2027-01-22, 0d
    Despliegue y Pruebas en Staging     :2027-01-25, 2027-02-01
    Hito 4 Final (Demo)                 :milestone, 2027-02-05, 0d
```
