import worker from "shared.worker";

export default {
	
	/** @param {Creep} creep **/
	run: (creep) => {

		if(creep.memory.upgrading && creep.carry.energy === 0) {
			creep.memory.upgrading = false;
			creep.say("🔄 harvest");
		}
		if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say("⚡ upgrade");
		}

		if(creep.memory.upgrading) {
			worker.upgrade(creep);
		} else {
			worker.harvest(creep);
		}
	}
};
