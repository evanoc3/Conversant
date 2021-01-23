.PHONY: build dev clean bindata frontend
DEFAULT_GOAL := dev


build:
	go build -o ./build/www-service -ldflags "-s" -tags "production" conversant/www/src
	cp .env build/.env


dev:
	go run conversant/www/src


clean:
	rm -rf ./build/
	rm -rf ./frontend/.next/ .frontend/out/


bindata:
	go generate conversant/www/src/service


frontend:
	cd frontend; npm run build