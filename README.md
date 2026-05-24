# 🌐 Pandoptimist
> **Pandemic Optimization System (POS)** — A high-performance, resilient, and intelligent microservices-based platform designed to bridge the resource gap during critical healthcare emergencies and pandemics.

---

## 📖 Overview

**Pandoptimist** is an open-source pandemic optimization platform designed to connect individuals in urgent need of critical medical resources (such as plasma, oxygen, ventilators, ICU beds, and emergency medicines) with altruistic donors. The coordination and fulfillment process is managed and streamlined by dedicated volunteers, ensuring optimal resource allocation under severe time and availability constraints. 

Additionally, the platform features a remote tele-consultation module allowing certified medical professionals to provide prescriptions, consult, and chat directly with patients in real-time.

```
       ┌────────────────────────────────────────────────────────┐
       │                 Angular Web Frontend                   │
       └──────────────────────────┬─────────────────────────────┘
                                  │ (HTTP / WebSocket)
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │             API Gateway (Spring Cloud Gateway)         │
       └──────────────────────────┬─────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼ (Routing & Load Balancing via Eureka)           ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   User Service   │     │  Patient Service │     │  Donor Service   │
│  (MySQL Auth)    │     │    (MongoDB)     │     │    (MongoDB)     │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   OTP Service    │     │ Medical Request  │     │ Volunteer Serv.  │
│    (Redis)       │     │    (MongoDB)     │     │    (MongoDB)     │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Chat Service   │     │  Doctor Consult. │     │  Graph Service   │
│ (MongoDB/WebSoc) │     │    (MongoDB)     │     │     (Neo4j)      │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                        │
         └──────────┬─────────────┘
                    ▼
       ┌────────────────────────┐
       │    War Room Service    │
       │   (MongoDB Dashboard)  │
       └────────────────────────┘
```

---

## 🛠️ Tools & Technologies

Pandoptimist is engineered using a modern cloud-native architecture, ensuring high scalability, modularity, and service resilience.

### Architecture & Backend Core
*   **Java 11 & Spring Boot (v2.4.3):** Powering the backend microservices.
*   **Microservices Design Pattern:** Clean separation of concerns with isolated service domains.
*   **Spring Cloud Gateway:** Central gateway acting as a reverse proxy, handling unified routing, CORS, and request routing.
*   **Eureka Discovery Server:** Dynamic service registration and client-side discovery.
*   **RabbitMQ Message Bus:** High-throughput asynchronous event-driven messaging (e.g., OTP dispatch, notifications).

### Web UI
*   **Angular:** Modern, responsive component-based UI for patients, doctors, donors, and volunteers.
*   **HTML5, Vanilla CSS3 & TypeScript:** Providing dynamic user flows and polished visuals.

### Core Persistence Suite
*   **MySQL:** Secure relational database for transactional User Management and Authentication profiles.
*   **MongoDB:** Document store ideal for high-write, schema-free entities such as medical requests, consultations, patient records, and live chat logs.
*   **Redis:** In-memory key-value store for session caching and rapid OTP expiration handling.
*   **Neo4j (v4.2.3):** Graph database facilitating proximity tracking, relation mapping, and resource optimization/routing.

### Observability & Infrastructure
*   **Docker & Docker Compose:** Easy orchestrating, containerization, and local deployment configuration.
*   **Prometheus:** Actively scraping metrics from Spring Boot Actuator endpoints for system telemetry.
*   **Grafana:** Central visual dashboards for microservice health, latency, and resource metrics.

---

## 🗺️ Microservices & Ports Directory

All client requests flow through the **API Gateway** on port `8080` and are routed internally based on Eureka path mappings.

| Container / Service Name | Host Port | Database / Integration | Primary Responsibility |
| :--- | :---: | :--- | :--- |
| `spring-cloud-gateway` | **8080** | *Gateway Routing* | Edge router, handles CORS, paths, and reverse proxy routing. |
| `eureka-server` | **8761** | *Service Registry* | Central registry for service discovery and heartbeat tracking. |
| `pandoptimist-webapp` | **9097** | *Angular UI* | Serves the web-based single-page application. |
| `user-management-service` | **8089** | MySQL | Registers, authenticates, and manages patient, doctor, donor, and volunteer credentials. |
| `otp-service` | **8081** | Redis / RabbitMQ | Dispatches and validates one-time passwords for authentication flows. |
| `patient-service` | **8085** | MongoDB | Stores patient profiles, history, and records. |
| `donor-service` | **8083** | MongoDB | Registers donors and maps active plasma/equipment donation details. |
| `medical-request-service` | **9091** | MongoDB | Captures and updates urgent patient requests for resources. |
| `volunteer-service` | **8084** | MongoDB | Orchestrates medical requests, matching volunteers to patient tickets. |
| `doctor-consultation-service` | **8082** | MongoDB | Coordinates tele-consultations and prescription workflows. |
| `chat-service` | **8095** | MongoDB | Enables real-time active message exchanges between doctors and patients. |
| `graph-service` | **8086** | Neo4j | Analyzes distance, proximity, and relation graphs for donor-patient matching. |
| `war-room-service` | **9095** | MongoDB | Drives aggregated dashboard data for overall pandemic coordination. |
| `mysql` | **3306** | MySQL | Stores credential schemas and user roles. |
| `mongo` | **27017** | MongoDB | Stores transactional request, chat, profile, and audit logs. |
| `neo4j` | **7474 / 7687** | Neo4j | Handles graph matches. |
| `database_redis` | **6379** | Redis | Caches active session profiles and OTP codes. |
| `rabbitmq` | **5672 / 15672** | RabbitMQ | Brokering events between services. |
| `prometheus` | **9090** | Prometheus | Scrapes metric streams from Actuator endpoints. |
| `grafana` | **3000** | Grafana | Visualization panels for operations metrics. |

---

## ⚡ Quick Start & Deployment Guide

Follow these steps to run the complete microservices mesh locally.

### 📋 Prerequisites
Ensure you have the following installed on your system:
*   [Java 11 JDK](https://adoptium.net/temurin/releases/?version=11)
*   [Apache Maven (v3.6+)](https://maven.apache.org/)
*   [Docker & Docker Compose](https://www.docker.com/products/docker-desktop/)

---

### 🚀 Step-by-Step Installation

#### 1. Clone & Build the Java Backend
Compile and package the parent project. This recursively compiles and generates `.jar` packages for all 13 modules using Maven:
```bash
mvn clean package -DskipTests
```

#### 2. Spin Up Infrastructure & Containers
Launch all microservices, databases, messaging, and monitoring layers using Docker Compose. The `--build` flag builds image templates from respective local Dockerfiles:
```bash
docker-compose up --build -d
```

#### 3. Verify Container Status
Check if all containers are healthy and active:
```bash
docker ps
```

---

## 📊 Observability & Dashboards

Once all services are up and running, you can access the operational dashboard panels:

*   **Eureka Discovery Dashboard:** [http://localhost:8761](http://localhost:8761) — *Monitor microservice registrations and health status.*
*   **RabbitMQ Management Console:** [http://localhost:15672](http://localhost:15672) `(guest/guest)` — *Inspect messaging queues and routing exchanges.*
*   **Prometheus Endpoint:** [http://localhost:9090](http://localhost:9090) — *Inspect system query metrics.*
*   **Grafana Telemetry Center:** [http://localhost:3000](http://localhost:3000) `(admin/admin)` — *Visual dashboards and performance widgets.*
*   **Neo4j Browser:** [http://localhost:7474](http://localhost:7474) `(neo4j/neo4j123)` — *Query the relationship graphs and matching links.*

---

## 🔒 Security & Gateway Integration
*   The architecture secures internal endpoints using a centralized **JWT Secret** managed by the **Spring Cloud Gateway**.
*   Gateway uses Client-Side Service Discovery through Eureka to automatically distribute load balance (`lb://`) queries across elastic instances of microservices.
*   Cross-Origin Resource Sharing (CORS) configurations are centralized at the gateway layer, supporting frictionless integration with the Angular frontend client.

