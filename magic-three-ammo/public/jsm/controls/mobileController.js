import {
	Euler,
	EventDispatcher,
	Vector3,
	Vector2
} from "three";

var mobile
mobile = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

var ww = document.body.clientWidth / 2;
var wh = document.body.clientHeight / 2;

var array_x = []
var array_y = []
var touches_x, touches_y;
var last_x, last_y;

var eulerX_angle = [].map(Number)
var eulerY_angle = [].map(Number)
var eulerY, eulerX;
var eulerY_final = 0;
var eulerX_final = 0;
var eulerY_total, eulerX_total;
var euler = new Euler(0, 0, 0, 'YXZ');
var PI_2 = Math.PI / 2;
var PI_2y = 2 * (Math.PI);
var vec = new Vector3();
var PointerLockControls = function (camera, domElement) {

	if (isMobile) {
		mobile = true;
	} else {
		mobile = false;
	}

	if (domElement === undefined) {
		console.warn('THREE.PointerLockControls: The second parameter "domElement" is now mandatory.');
		domElement = document.body;
	}

	this.domElement = domElement;
	this.isLocked = false;
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = 2 * (Math.PI); // radians
	var scope = this;

	var changeEvent = {
		type: 'change'
	};
	var lockEvent = {
		type: 'lock'
	};
	var unlockEvent = {
		type: 'unlock'
	};

	//Function for getting arrays fires on touchmove
	function arrayTouches(e) {
		// array for touches
		touches_x = e.changedTouches[0].clientX - ww
		touches_y = e.changedTouches[0].clientY - wh
		array_x.push(touches_x)
		array_y.push(touches_y)
		last_x = array_x[array_x.length - 2];
		last_y = array_y[array_y.length - 2];
		// array for euler
		eulerY = (touches_x - last_x) * 0.004;
		eulerX = (touches_y - last_y) * 0.004;
		if (eulerY) {
			eulerY_angle.push(eulerY)
			eulerX_angle.push(eulerX)
		} else {
			eulerY_angle.push(0);
			eulerX_angle.push(0);
		}
		scope.dispatchEvent(changeEvent);
	}
	//Function for set rotation from set arrays fires on  touchmove
	function onTouchMove(e) {
		euler.setFromQuaternion(camera.rotation);
		eulerY_total = eulerY_angle.reduce(function (sum, element) {
			return sum + element;
		}, 0);
		eulerX_total = eulerX_angle.reduce(function (sum, element) {
			return sum + element;
		}, 0);
		euler.y = eulerY_final + eulerY_total
		euler.x = eulerX_final + eulerX_total
		camera.quaternion.setFromEuler(euler);
		scope.dispatchEvent(changeEvent);
	};
	// the delta value of euler and touchmove  should be offset for recalibration from where the last move stopped
	function onTouchEnd(e) {
		eulerY_final = euler.y;
		eulerX_final = euler.x;
		eulerY_angle = [];
		eulerX_angle = [];
		array_x = [];
		array_y = [];
		scope.dispatchEvent(changeEvent);
	}
	//    mouseevent
	function onMouseMove(event) {
		if (scope.isLocked === false) return;
		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
		euler.setFromQuaternion(camera.quaternion);
		euler.y -= movementX * 0.002;
		euler.x -= movementY * 0.002;
		euler.x = Math.max(PI_2 - scope.maxPolarAngle, Math.min(PI_2 - scope.minPolarAngle, euler.x));
		euler.y = Math.max(-PI_2y, Math.min(PI_2y, euler.y));
		camera.quaternion.setFromEuler(euler);
		scope.dispatchEvent(changeEvent);
	}

	function onPointerlockChange() {
		if (document.pointerLockElement === scope.domElement) {
			scope.dispatchEvent(lockEvent);
			scope.isLocked = true;
		} else {
			scope.dispatchEvent(unlockEvent);
			scope.isLocked = false;
		}
	}

	function onPointerlockError() {
		console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
	}

	this.connect = function () {
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('touchmove', onTouchMove, false);
		document.addEventListener('touchmove', arrayTouches, false);
		document.addEventListener('touchend', onTouchEnd, false);
		document.addEventListener('pointerlockchange', onPointerlockChange, false);
		document.addEventListener('pointerlockerror', onPointerlockError, false);
	};

	this.disconnect = function () {
		document.removeEventListener('mousemove', onMouseMove, false);
		document.removeEventListener('touchmove', arrayTouches, false);
		document.removeEventListener('touchend', onTouchEnd, false);
		document.removeEventListener('touchmove', onTouchMove, false);
		document.removeEventListener('pointerlockchange', onPointerlockChange, false);
		document.removeEventListener('pointerlockerror', onPointerlockError, false);
	};

	this.dispose = function () {
		this.disconnect();
	};

	this.getObject = function () { // retaining this method for backward compatibility
		return camera;
	};

	this.getDirection = function () {
		var direction = new Vector3(0, 0, -1);
		return function (v) {
			return v.copy(direction).applyQuaternion(camera.quaternion);
		};
	}();

	this.moveForward = function (distance) {
		vec.setFromMatrixColumn(camera.matrix, 0);
		vec.crossVectors(camera.up, vec);
		camera.position.addScaledVector(vec, distance);
	};
	this.moveBackward = function (distance) {
		vec.setFromMatrixColumn(camera.matrix, 0);
		vec.crossVectors(camera.up, vec);
		camera.position.addScaledVector(vec, distance);
	};

	this.moveRight = function (distance) {
		vec.setFromMatrixColumn(camera.matrix, 0);
		camera.position.addScaledVector(vec, distance);
	};

	if (mobile == true) {
		this.lock = function () {
			scope.isLocked = true;
			this.connect();
		};
	} else {
		this.lock = function () {
			this.domElement.requestPointerLock();
		};
	}

	this.unlock = function () {
		document.exitPointerLock();
	};
	this.connect();
};

PointerLockControls.prototype = Object.create(EventDispatcher.prototype);
PointerLockControls.prototype.constructor = PointerLockControls;

export {
	PointerLockControls
};