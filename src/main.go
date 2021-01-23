package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	dotenv "github.com/joho/godotenv"

	"conversant/www/src/service"
)


// main is the entry point for the service
func main() {
	setupLogging()
	setupEnvironment()
	setupInterruptListener()
	service.Setup()
	service.Start()
}


// setupLogging 
func setupLogging() {
	log.SetPrefix("WWW: ")
}


// loadEnv reads environment variables from a .env file
func setupEnvironment() {
	err := dotenv.Load(".env")
	if err != nil {
		log.Printf("Error: Could not load .env file. Error message: %s\n", err.Error())
	}

	required_env_vars := []string{"WWW_SERVICE_PORT"}
	for _, required_env_var := range required_env_vars {
		if _, env_var_is_set := os.LookupEnv(required_env_var); !env_var_is_set {
			log.Fatalf("Error: The \"%s\" environment variable was not set and is required\n", required_env_var)
		}
	}

	log.Print("Successfully read .env file\n")
}


// setupInterruptListener constantly listens for a process interrupt in a goroutine
func setupInterruptListener() {
	interrupt_channel := make(chan os.Signal)
	signal.Notify(interrupt_channel, os.Interrupt, syscall.SIGTERM, syscall.SIGINT)

	go func() {
		<-interrupt_channel
		if service.Is_Started {
			service.Stop()
		}
	}()
}

