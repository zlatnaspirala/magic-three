
/*
 * @Class PARTICLE
 * @param GUI
 */

function PARTICLE(GUI) {

    var ROOT = this;

    ROOT.particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 250000
        });
    ROOT.particleSystem.scale.setX(20);
    ROOT.particleSystem.scale.setY(20);
    ROOT.particleSystem.scale.setZ(20);
    ROOT.particleSystem.position.setY(100);
    //earthPivot.add( earth );

    ROOT.options = {
        position: new THREE.Vector3(),
        positionRandomness: 2,
        velocity: new THREE.Vector3(),
        velocityRandomness: .5,
        color: 0xaa88ff,
        colorRandomness: .2,
        turbulence: .5,
        lifetime: 0.1,
        size: 5,
        sizeRandomness: 1
    };

    ROOT.options.position.y = 100;

    ROOT.spawnerOptions = {
        spawnRate: 15000,
        horizontalSpeed: .5,
        verticalSpeed: .33,
        timeScale: 1
    }

    if (GUI == true) {
        var gui_particle = new dat.GUI();
        gui_particle.add(ROOT.options, "velocityRandomness", 0, 3);
        gui_particle.add(ROOT.options, "positionRandomness", 0, 3);
        gui_particle.add(ROOT.options, "size", 1, 20);
        gui_particle.add(ROOT.options, "sizeRandomness", 0, 25);
        gui_particle.add(ROOT.options, "colorRandomness", 0, 1);
        gui_particle.add(ROOT.options, "lifetime", .1, 10);
        gui_particle.add(ROOT.options, "turbulence", 0, 1);
        gui_particle.add(ROOT.spawnerOptions, "spawnRate", 10, 30000);
        gui_particle.add(ROOT.spawnerOptions, "timeScale", -1, 1);
    }

    PROGRAM.AUTO_UPDATE.push(ROOT);
    ROOT.tick = 0;

    ROOT.AUTO_UPDATE = function () {

        var delta = clock.getDelta() * ROOT.spawnerOptions.timeScale;
        ROOT.tick += delta;

        if (ROOT.tick < 0)
            ROOT.tick = 0;

        if (delta > 0) {
            ROOT.options.position.x = Math.sin(ROOT.tick * ROOT.spawnerOptions.horizontalSpeed) * 20;
            ROOT.options.position.y = Math.sin(ROOT.tick * ROOT.spawnerOptions.verticalSpeed) * 10;
            ROOT.options.position.z = Math.sin(ROOT.tick * ROOT.spawnerOptions.horizontalSpeed + ROOT.spawnerOptions.verticalSpeed) * 5;

            for (var x = 0; x < ROOT.spawnerOptions.spawnRate * delta; x++) {
                // Yep, that's really it. Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                ROOT.particleSystem.spawnParticle(ROOT.options);
            }
        }

        ROOT.particleSystem.update(ROOT.tick);

    };

}
