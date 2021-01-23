package service

//go:generate go-bindata -fs -prefix "../../frontend/out/" -pkg "service" ../../frontend/out/...

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var Is_Started bool
var server *http.Server
var app *gin.Engine


// Setup
func Setup() {
	Is_Started = false
	app = gin.New()

	log.Print("Adding a recovery middleware to gin app\n")
	app.Use(gin.Recovery())

	log.Print("Adding bindata filesystem to gin app\n")
	app.StaticFS("/", AssetFile())

	log.Print("Creating HTTP server wrapper and attaching gin app\n")
	server = &http.Server {
		Addr: fmt.Sprintf(":%s", os.Getenv("WWW_SERVICE_PORT")),
		Handler: app,
	}
}


// Start 
func Start() {
	log.Printf("Starting service on interface %s\n", server.Addr)
	Is_Started = true
	
	err := server.ListenAndServe()
	if err != nil {
		log.Fatalf("Error: Failed to start the service. Error message: %s\n", err.Error())
	}
}


// Stop
func Stop() {
	log.Print("Shutting down the service\n")
	Is_Started = false
	err := server.Close()
	if err != nil {
		log.Printf("Error: Failed to shut down the server. Error message: %s\n", err.Error())
	}
}