export default function RegistrationNumbers(db) {
    let townId;

    function checkRegNum(regNum) {
        let regEx = /^(CA|CL|CK|CJ|CFG)\s?\d{1,3}\s?\d{1,3}$/i

        var valid = regEx.test(regNum);
        // console.log(valid);
        return valid;
    }

    function addRed() {
        return "red"

    };
    function addNumberPlate() {
        return "numberPlate"
    }
    function addFont() {
        return "font"
    }
    function addCenter() {
        return "text-align"
    }
    function filterTown(town) {
        if (town === "capetown") {
            allTheRegNums;
        }
        if (town === "paarl") {
            allTheRegNums
        }
        if (town === "malmesbury") {
            allTheRegNums
        }
        if (town === "stellenbosch") {
            allTheRegNums
        }
        if (town === "allTowns") {
            allTheRegNums
        }
    }
    function setErrors() {
        if (regNum = "") {
            return "No registration number entered"
        }

    }

    return {
        checkRegNum,
        addRed,
        addNumberPlate,
        addFont,
        addCenter,
        filterTown,
        setErrors
    }


}


