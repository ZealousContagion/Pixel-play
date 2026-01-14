.PHONY: build up down logs shell

# Build the docker image
build:
	docker-compose build

# Start the application in detached mode
up:
	docker-compose up -d

# Stop the application
down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# Access the container shell
shell:
	docker exec -it pixel-play /bin/sh

# Restart the application
restart: down up
