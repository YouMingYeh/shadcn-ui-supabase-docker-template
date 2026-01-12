.PHONY: help dev-docker up down logs logs-web logs-admin logs-server clean

# Default target
help:
	@echo "App Monorepo - Docker Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev-docker       - Run all apps in Docker (development mode)"
	@echo ""
	@echo "Production:"
	@echo "  make up               - Start all services (docker-compose up -d)"
	@echo "  make down             - Stop all services"
	@echo ""
	@echo "Logs:"
	@echo "  make logs             - View logs from all services"
	@echo "  make logs-web         - View logs from web service"
	@echo "  make logs-admin       - View logs from admin service"
	@echo "  make logs-server      - View logs from server service"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean            - Remove all containers, volumes, and images"
	@echo ""
	@echo "For local development: pnpm dev"
	@echo "For local build: pnpm build"
	@echo ""

# Docker development
dev-docker:
	docker-compose -f docker-compose.dev.yml up

# Docker production
up:
	docker-compose up -d

down:
	docker-compose down

# Logs
logs:
	docker-compose logs -f

logs-web:
	docker-compose logs -f web

logs-admin:
	docker-compose logs -f admin

logs-server:
	docker-compose logs -f server

# Cleanup
clean:
	docker-compose down -v
	docker system prune -af --volumes