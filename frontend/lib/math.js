
// RANDOM INT FROM-TO
function randomIntFromTo(min, max) {

    if (typeof min === 'object' || typeof max === 'object') {

        //SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> "+typeof min+" and "+typeof min+" << must be string or number.");

    } else if (typeof min === 'undefined' || typeof max === 'undefined') {

        //SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> "+typeof min+" and "+typeof min+"  << must be string or number.");

    } else {

        return Math.floor(Math.random() * (max - min + 1) + min);

    }

}

function boolToNum(b) {

    return b ? 1 : 0;

}

function decimalToHex(d) {

    var hex = Number(d).toString(16);
    hex = "000000".substr(0, 6 - hex.length) + hex;
    return hex.toUpperCase();

}

function to_angle(radians) {

    return radians * (180 / Math.PI);

}

function to_rad(deg) {

    return deg * (Math.PI / 180);

}

Array.prototype.unset = function (value) {
    if (this.indexOf(value) != -1) {
        this.splice(this.indexOf(value), 1);
    }
}

Array.prototype.unsetByIndex = function (value) {

    this.splice(value, 1);

}

function isOdd(num) {
    return num % 2;
}

function remove_last(str) {
    return str.slice(0, -1)
}

// GET PULSE VALUES IN REAL TIME
function OSCILLATOR(min, max, step) {

    this.COUNT = 'loop';

    if ((typeof min === "string" || typeof min === "number") && (typeof max === "string" || typeof max === "number") && (typeof step === "string" || typeof step === "number")) {

        this.min = parseFloat(min);
        this.max = parseFloat(max);
        this.step = parseFloat(step);
        this.value_ = parseFloat(min);
        this.status = 0;
        this.UPDATE = function (STATUS_) {
            if (STATUS_ === undefined) {
                if (this.status == 0 && this.value_ < this.max) {
                    this.value_ = this.value_ + this.step;
                    if (this.value_ >= this.max) {

                        if (this.COUNT == 'loop') {

                            this.value_ = this.max;
                            this.status = 1;

                        } else {

                            this.value_ = this.max;
                            this.status = 3;

                        }

                    }
                    return this.value_;
                } else if (this.status == 1 && this.value_ > this.min) {
                    this.value_ = this.value_ - this.step;
                    if (this.value_ <= this.min) {
                        this.value_ = this.min;
                        this.status = 0;
                    }
                    return this.value_;
                }
            } else {
                return this.value_;
            }
        };

    } else {

        console.log("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");

    }

}
