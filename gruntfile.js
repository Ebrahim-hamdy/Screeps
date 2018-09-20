module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-screeps");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-babel");

	const credentials = grunt.file.readJSON("./credentials.json");

	grunt.initConfig({
		babel: {
			options: {
				"sourceMap": true,
			},
			dist: {
				files: [{
					expand: true,
					cwd: "src/",
					src: "**",
					dest: "dist/",
					filter: "isFile",
					rename: function (dest, src) {
						// Change the path name utilize dots for folders
						return dest + src.replace(/\//g,".");
					}
				}]
			}
		},

		screeps: {
			options: {
				email: credentials.email,
				password: credentials.password,
				branch: credentials.branch,
				ptr: credentials.ptr
			},
			dist: {
				src: ["dist/*.js"]
			}
		},

		watch: {
			scripts: {
				files: ["src/**/*.js"],
				tasks: ["clean","babel","screeps"]
			},
		},

		clean: {
			"dist": ["dist"]
		}
	});

	grunt.registerTask("default", ["clean", "babel", "screeps"]);
};
