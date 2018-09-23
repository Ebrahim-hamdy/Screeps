# Screeps

## Commands
	- Pre install: add credentials.json file with Screeps email, password
	- Install: npm install
	- Run: grunt

## Creep Roles

### builder

Description: Builder role for building structures

- Routines

  - Harvest Energy From Source
  - Build Structures
  - If there is nothing to build, find something to repair
  - If there is nothing to repair, help upgrade the controller

### harvest-controller

Description: A harvest role designed to get feed and upgrade the controller.

- Routines

  - Harvest energy from source
  - Upgrade the controller

### repairer

Description: Role to repair structures that degrade

- Routines

  - Harvest energy from source
  - Repair structures
  - If there is nothing to repair, help build structures
  - If there is nothing to build, help upgrade the controller

### harvest-general

Description: Harvest role that gets energy and places it where needed: Spawn, structures etc.

- Routines:

  - Harvest energy from source
  - Transfer energy to structures that need it (spawners, extensions, towers etc)
