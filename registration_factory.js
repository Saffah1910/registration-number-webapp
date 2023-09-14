export default function RegistrationNumbers(dbLogic) {



    function checkRegNum(regNum) {
        let regEx = /^(CA|CL|CK|CJ|CF)\s?\d{1,3}\s?\d{1,3}$/i
        var valid = regEx.test(regNum);
        return valid;
    }


    // async function setErrors(regNum) {
    //     let errorMessage = "";
    //     const exists = await dbLogic.insertRegNum(regNum);
    //     if (regNum == "") {
    //         errorMessage = "Enter the vehicle's registration number.";
    //     }
    //     else if (!checkRegNum(regNum)) {
    //         errorMessage = "Please provide a valid registration number.";
    //     }
    //     else if (!exists) {
    //         errorMessage = "This registration number has already been added.";
    //         console.log(errorMessage);

    //     }

    //     return errorMessage

    // }

    async function setErrors(regNum) {
        let errorMessage = "";
        const exists = await dbLogic.insertRegNum(regNum);
      
        if (regNum == "") {
          errorMessage = "Enter the vehicle's registration number.";
        } else if (!checkRegNum(regNum)) {
          errorMessage = "Please provide a valid registration number.";
        } else if (!exists) {
          errorMessage = "This registration number has already been added.";
          console.log(errorMessage);
        }
      
        return errorMessage;
      }
      
    async function filterError(townId) {
        let message = "";
        let filterQuery = await dbLogic.filter(townId);


        if (filterQuery.length === 0) {
            message = "Sorry, there are no registrations available for this location.";
        }

        return message;
    }

    return {
        checkRegNum,
        setErrors,
        filterError

    }


}


