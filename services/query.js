export default function regNumQuery(db) {

    async function insertRegNum(regNo) {
        let townCode =  await giveId(regNo)
        // console.log(townCode[0].id)
        await db.none('INSERT INTO registration_numbers (number, town_id)VALUES ($1, $2)', [regNo, townCode[0].id])
    }
    async function getRegNum() {
       let result= await db.any('SELECT * FROM registration_numbers');
        return result
        //check if it is an object that is being retured
    }

    // async function getRegNum() {
        
    //       let results = await db.any('SELECT number FROM registration_numbers');
    //       // Extract just the "number" property from each result
    //       let registrationNumbers = results.map(result => result.number);
    //       return registrationNumbers;
      
    // }
      
//this function connects the town id with the 1 in the town tab use sub
    async function giveId(regNo) {
        
        let townTag = regNo.substring(0, 2, 3);
        // console.log(townTag);
        let result = await db.any('SELECT id FROM towns WHERE town_name = $1', [townTag]);
        //console.log(result);
        return result
    }


    async function deleteFromTable() {
        await db.none('DELETE FROM registration_numbers');
        // console.log('table cleared');
    }
    return {
        insertRegNum,
        getRegNum,
        deleteFromTable,
        giveId
    }
}