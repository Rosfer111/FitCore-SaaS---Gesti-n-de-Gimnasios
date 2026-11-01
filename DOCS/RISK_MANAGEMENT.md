# Gestión de Riesgos Técnicos y PRL - FitCore SaaS
**Proyecto:** FitCore (Plataforma web SaaS de gestión para pequeños gimnasios)
**Autores:** Fernando Rosón de Mesa, Eamonn S. Fitzgerald Valenzuela
**Fecha:** 30-10-2026

---

## 1. Identificación y Registro de Riesgos Técnicos

Evaluaremos los riesgos utilizando la fórmula del nivel de riesgo: $R = \text{Probabilidad} \times \text{Impacto}$.
La probabilidad y el impacto se valoran de 1 a 5. Los niveles de riesgo se clasifican en:
- **Baja:** 1 a 6
- **Moderada:** 8 a 12
- **Crítica:** 15 a 25

| Código | Riesgo Técnico | Probabilidad (P) | Impacto (I) | Nivel (R) | Clasificación |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **RT-01** | Corrupción de la base de datos MySQL local o volumen Docker durante migraciones. | 3 | 3 | 9 | Moderada |
| **RT-02** | Exposición inadvertida de credenciales y secretos en commits de Git. | 2 | 5 | 10 | Moderada |
| **RT-03** | Sobrecarga o caída del servidor Node.js/Express durante picos de concurrencia en reservas. | 3 | 5 | 15 | Crítica |
| **RT-04** | Errores de renderizado y pérdida de estado en React por mala sincronización en el calendario. | 4 | 2 | 8 | Moderada |
| **RT-05** | Indisponibilidad o cambios rompientes en pasarela de pagos / APIs externas. | 2 | 4 | 8 | Moderada |
| **RT-06** | Conflictos críticos de fusión en la rama principal por falta de integración. | 3 | 3 | 9 | Moderada |

---

## 2. Elaboración de la Matriz de Evaluación ($5 \times 5$)

| Probabilidad / Impacto | 1 (Insignificante) | 2 (Menor) | 3 (Moderado) | 4 (Mayor) | 5 (Catastrófico) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **5 (Muy Alta)** | 5 | [RT-02] 10 | 15 | [RT-03] 20 | 25 |
| **4 (Alta)** | 4 | [RT-05] 8 | 12 | 16 | 20 |
| **3 (Media)** | 3 | 6 | [RT-01] [RT-06] 9 | 12 | 15 |
| **2 (Baja)** | 2 | 4 | 6 | [RT-04] 8 | 10 |
| **1 (Muy Baja)** | 1 | 2 | 3 | 4 | 5 |

---

## 3. Redacción de Fichas de Contingencia

### Ficha 1: RT-03 — Sobrecarga del servidor bajo picos de concurrencia
- **Nivel de Riesgo:** Crítico (15)
- **Disparador (Trigger):** El uso de CPU del contenedor backend supera el 85% o las peticiones de reserva simultáneas devuelven error de *Time-out* (>500ms).
- **Medidas Preventivas:**
  1. Implementar limitador de tasa en los endpoints críticos de reservas con `express-rate-limit`.
  2. Optimizar las consultas SQL añadiendo índices en las tablas de clases y reservas.
- **Plan de Contingencia:**
  1. Escalado horizontal automático de contenedores mediante Docker Compose o réplicas en la plataforma cloud.
  2. Activación temporal de una página de mantenimiento elegante en el frontend si el servicio se satura por completo.
  3. Restauración del tráfico mediante balanceador de carga.
- **Responsable:** Backend Lead / DevOps.

### Ficha 2: RT-02 — Exposición de Secretos y Credenciales en Repositorio
- **Nivel de Riesgo:** Moderada-Alta (10)
- **Disparador (Trigger):** Alerta automática de GitHub advirtiendo de una clave API o contraseña filtrada en el historial de commits.
- **Medidas Preventivas:**
  1. Uso estricto de variables de entorno mediante archivos `.env`.
  2. Instalación de *pre-commit hooks* para bloquear commits con patrones de claves.
- **Plan de Contingencia:**
  1. Revocación y regeneración inmediata de la clave o token comprometido en el servicio afectado.
  2. Limpieza del historial de Git mediante `git filter-repo` o borrado de la rama si el commit es reciente.
  3. Auditoría de accesos para verificar si la clave fue utilizada de forma maliciosa.
- **Responsable:** Security Officer / Tech Lead.

### Ficha 3: RT-01 — Corrupción de Base de Datos Local / Docker
- **Nivel de Riesgo:** Moderada (9)
- **Disparador (Trigger):** Fallo al arrancar el contenedor MySQL de Docker tras un cierre forzoso o error de sintaxis en un script de migración.
- **Medidas Preventivas:**
  1. Uso de volúmenes persistentes independientes de Docker y scripts automatizados de *seed* y migraciones versionadas.
  2. Respaldos diarios automáticos almacenados en la carpeta `backup/`.
- **Plan de Contingencia:**
  1. Detener y eliminar el contenedor y volumen corrupto: `docker compose down -v`.
  2. Recrear el entorno de base de datos limpia con `docker compose up -d`.
  3. Ejecutar el script de restauración del último volcado válido: `mysql -u root -p fitcore < backup/latest.sql`.
- **Responsable:** Database Administrator.

---

## 4. Plan de Ergonomía, Salud y Prevención (PRL)

Dado que el desarrollo de FitCore se realizará íntegramente frente a pantallas, el equipo adopta formalmente las siguientes medidas de Prevención de Riesgos Laborales:

1. **Ergonomía en el Puesto de Trabajo:**
   - Ajuste de la silla de oficina para mantener un ángulo de 90° en rodillas y codos, con apoyo lumbar adecuado.
   - Colocación de la parte superior de la pantalla del ordenador a la altura de los ojos a una distancia aproximada de 50-70 cm para evitar tensiones cervicales.

2. **Gestión de Carga Mental y Pausas Activas:**
   - Aplicación de la técnica Pomodoro (bloques de trabajo de 25-50 minutos intercalados con 5-10 minutos de pausa para estiramientos y descanso visual).
   - Adopción de la regla 20-20-20 para la fatiga visual: cada 20 minutos, mirar a un objeto situado a 6 metros durante al menos 20 segundos.

3. **Compromiso de Desconexión Digital:**
   - Establecimiento de horarios claros de desarrollo y prohibición de enviar notificaciones fuera de la jornada laboral acordada, respetando el descanso nocturno y los fines de semana de los desarrolladores.
