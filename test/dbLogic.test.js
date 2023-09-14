import assert from 'assert';
import regNumQuery from '../services/query.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({})
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

const query = regNumQuery(db);

describe('namesQuery', function () {
    this.timeout(20000);

    beforeEach(async function () {
        await db.none("DELETE FROM registration_numbers")
    })

    it('gives the correct town id to registration number added', async () => {
        const regNo = 'CA 123';
        const expected = [{ id: 1 }];
    
        const query = regNumQuery(db);
    
        const result = await query.giveId(regNo);
    
        assert.deepEqual(result, expected);
    });
    
    it('inserts a registration number into the table and handles duplicates', async () => {
        const regNo = 'CA 123';
        const townId = 1;
        const query = regNumQuery(db);
        
        const firstInsertResult = await query.insertRegNum(regNo, townId);
    
        const insertedRecord = await db.oneOrNone('SELECT * FROM registration_numbers WHERE number = $1 AND town_id = $2', [regNo, townId]);
    
        assert.notEqual(insertedRecord, null); 
        assert.equal(insertedRecord.number, regNo);
        assert.equal(insertedRecord.town_id, townId);
    
        const secondInsertResult = await query.insertRegNum(regNo, townId);
    
        assert.equal(secondInsertResult, undefined); 
    });
    it('returns all registration numbers in the table', async () => {
        const query = regNumQuery(db);
        const regNumbers = await query.getRegNum();
    });
    
       


    it("should clear all the regNums when the reset button is clicked", async function () {
        const query = regNumQuery(db);
        const regNo = 'CA 123';
        const townId = 1;
    
        await query.insertRegNum(regNo, townId);
    
        const initialResults = await query.getRegNum();
        const initialCount = initialResults.length;
    
        await query.deleteFromTable();
    
        const clearedResults = await query.getRegNum();
    
        assert.equal(clearedResults.length, 0);
    });
    
    

});