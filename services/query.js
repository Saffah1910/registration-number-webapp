export default function regNumQuery(db) {

    async function insertRegNum(regNo) {
        let townCode = await giveId(regNo);
    
        // Check if the registration number already exists in the table
        const existingRecord = await db.oneOrNone('SELECT number FROM registration_numbers WHERE number = $1', [regNo]);
    
        if (!existingRecord) {
            // If no existing record found, insert the registration number
            await db.none('INSERT INTO registration_numbers (number, town_id) VALUES ($1, $2)', [regNo, townCode[0].id]);
            console.log('Registration number inserted successfully.');
        } else {
            console.log('Registration number already exists in the table.');
        }
    }
    

    async function getRegNum() {
       let result = await db.any('SELECT * FROM registration_numbers');
        return result
        //check if it is an object that is being retured
    }


      
//this function connects the town id with the 1 in the town tab use substring
    async function giveId(regNo) {
        
        let townTag = regNo.substring(0, 2)
        //  || regNo.substring(0, 3);
        // console.log(townTag);
        let result = await db.any('SELECT id FROM towns WHERE town_name = $1', [townTag]);
        //console.log(result);
        return result
    }

//this function will go to reg table and only take reg numbers that match with id that is connected to the value in dropdown
    // async function filter(townId){

    //    return await db.manyOrNone('SELECT number FROM registration_numbers WHERE town_id = $1',[townId])

    // }

    async function filter(townId) {
        const registrationNumbers = await db.manyOrNone('SELECT number FROM registration_numbers WHERE town_id = $1', [townId]);

       
        return registrationNumbers;
    }
    


    async function deleteFromTable() {
        await db.none('DELETE FROM registration_numbers');
        // console.log('table cleared');
    }
    return {
        insertRegNum,
        getRegNum,
        filter,
        deleteFromTable,
        giveId
    }
}