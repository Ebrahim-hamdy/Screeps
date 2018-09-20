import roles from "shared.roles";
import worker from "shared.worker";


export function loop () {

	let workerLists = {
		builders: _.filter(Game.creeps, (creep) => creep.memory.role === "builder"),
		upgraders: _.filter(Game.creeps, (creep) => creep.memory.role === "upgrader"),
		harvesters: _.filter(Game.creeps, (creep) => creep.memory.role === "harvester")
	};

	// Clean memory
	for (let creep in Memory.creeps) {
		if (!Game.creeps[creep]) {
			delete Memory.creeps[creep];
			console.log(`Clearing removed creep ${creep} from memory`);
		}
	}

	// Create workers
	for (let currWorker in workerLists) {
		if (workerLists[currWorker].length < 3) {
			worker.create("Spawn1", worker.buildBody(Game.spawns["Spawn1"].room.energyAvailable), currWorker.slice(0, -1));
		}
	}

	// Text with icon on spawning
	if (Game.spawns["Spawn1"].spawning) {
		let spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
		Game.spawns["Spawn1"].room.visual.text("🛠️" + spawningCreep.memory.role, Game.spawns["Spawn1"].pos.x + 1, Game.spawns["Spawn1"].pos.y, { align: "left", opacity: 0.8 });
	}

	// Run creeps per role
	for (let i in Game.creeps) {
		let creep = Game.creeps[i];
		roles[creep.memory.role].run(creep);
	}

}
