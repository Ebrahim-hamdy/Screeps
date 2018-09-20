import worker from "shared.worker";

export default {

	/** @param {Creep} creep **/
	run: (creep) => {
		if (creep.carry.energy < creep.carryCapacity && !creep.memory.upgrading) {
			worker.harvest(creep);
		} else {
			let targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return ((structure.structureType === STRUCTURE_EXTENSION ||
							structure.structureType === STRUCTURE_SPAWN ||
							structure.structureType === STRUCTURE_TOWER) &&
							structure.energy < structure.energyCapacity);
				}
			});
			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
				}

				creep.memory.upgrading = creep.carry.energy > 0;
				
			} else {
				creep.memory.upgrading = true;
				worker.upgrade(creep);
			}
		}
	}
};
