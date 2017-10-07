package main

import (
	"log"
	"os"
)

func main() {
	plyr := Player{class: Class{}, race: Race{}, strength: 20, constution: 20, intelligence: 20, wisdom: 20, charisma: 20, dexterity: 20, user_id: "420691337", name: "L33tHaskzor", gold: 1000000, exp: 100000}
	err := plyr.WritePlayerFile(".")
	if err != nil {
		log.Fatal(err)
	}
}

type Class struct{}
type Race struct{}

type Player struct {
	class        Class
	race         Race
	strength     int
	constution   int
	intelligence int
	wisdom       int
	charisma     int
	dexterity    int
	user_id      string
	name         string
	gold         int
	exp          int
}

func (p *Player) WritePlayerFile(file_path string) (err error) {
	f, file_err := os.Open("./Players/" + p.user_id + ".plyr")
	if file_err != nil {
		f, file_create_err := os.Create("./Players/" + p.user_id + ".plyr")
		if file_create_err != nil {
			log.Fatal(file_create_err)
		}
		f.Write([]byte("Hello World!"))
		defer f.Close()
	}
	defer f.Close()
	f.Write([]byte("Hello World!"))
	return
}
