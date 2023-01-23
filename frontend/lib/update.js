
function animate() {

    PROGRAM.AUTO_UPDATE.forEach(function (entry) {

        entry.AUTO_UPDATE()

    });
	
    requestAnimationFrame(animate);
    render();

}
