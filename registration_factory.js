export default function RegistrationNumbers(dbLogic) {

    let errorMessage = "";


   async function checkRegNum(regNum) {
        let regEx = /^(CA|CL|CK|CJ|CF)\s?\d{1,3}\s?\d{1,3}$/i
        var valid = regEx.test(regNum);
        return valid;
    }


    async function setErrors(regNum) {
        const currentRegNum = await dbLogic.insertRegNum(regNum)
        if (regNum = "") {
            errorMessage = "Please enter registartion number";
        }
        else if(!checkRegNum(regNum)) {
            errorMessage = "Please enter valid registration number";
        }
        else if(!currentRegNum){
            errorMessage =  "Registration number already exists"
        }
        console.log(errorMessage);
        return errorMessage

    }
   async function filterError(){
    let message = "";
   let filterQuery = await dbLogic.filter();
        
        if (filterQuery.registrationNumbers.length === 0) {
            message = "No registration numbers found for this town.";
         }
         return message
    }

    return {
        checkRegNum,
        setErrors,
        filterError
        
    }


}


