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
    // it('inserts the registration number into the table', async () => {
    //     const regNo = 'ca 123';
    //     const townId = 1;


    //     await query.insertRegNum(regNo, townId);

    //     // Query the database to retrieve the inserted record
    //     const insertedRecord = await db.oneOrNone('SELECT * FROM registration_numbers WHERE number = $1 AND town_id = $2', [regNo, townId]);

    //     // Check if a record was inserted
    //     assert(insertedRecord !== null);

    //     // If insertedRecord is not null, then access its properties
    //     if (insertedRecord) {
    //         assert.strictEqual(insertedRecord.number, regNo); // Check if the number matches
    //         assert.strictEqual(insertedRecord.town_id, townId); // Check if the town_id matches
    //     }

    // });
    it('gives the correct town id to registration number added', async () => {
        let regNo = 'CA 123';
        let expected = [{ id: 1 }];
      
        // Mock the database query result
        db.any.mockResolvedValue(expected);
      
        const result = await query.giveId(regNo, db);
      
        // Check if the expected database query was called
        expect(db.any).toHaveBeenCalledWith('SELECT id FROM towns WHERE town_name = $1', ['CA']);
      
        // Check if the function returns the expected result
        expect(result).toEqual(expected);
      });
      
    it('inserts the registration number into the table', async () => {
        const regNo = 'ca 123';
        const townId = 1;
        await query.insertRegNum(regNo, townId);

        // Query the database to retrieve the inserted record
        const insertedRecord = await db.oneOrNone('SELECT * FROM registration_numbers WHERE number = $1 AND town_id = $2', [regNo, townId]);

        // Assertions using assert.equal
        assert.notEqual(insertedRecord, null); // Check if a record was inserted

        // If insertedRecord is not null, then access its properties
        if (insertedRecord) {
            assert.equal(insertedRecord.number, regNo); // Check if the number matches
            assert.equal(insertedRecord.town_id, townId); // Check if the town_id matches
        }
    });





    it('returns all registration numbers in the table', async () => {
        const query = regNumQuery(db);
        const regNumbers = await query.getRegNum();
    });

    it("should not update or insert for an invalid name", async function () {
        const invalidName = '123HI';

        const success = await query.updateAndInsertName(invalidName);

        assert.strictEqual(success, false);

        const updatedRecord = await db.oneOrNone(
            "SELECT * FROM greeting_table WHERE LOWER(names) = $1",
            ['123HI']
        );

        assert.strictEqual(updatedRecord, null);
    });


    it("should clear the all the regNums when the reset button is clicked", async function () {
        await query.insertRegNum('ca 457', 1);
        let initialResults = await query.getRegNum();
        await query.deleteFromTable();
        assert.equal(initialResults);

    });
    it("should clear all the regNums when the reset button is clicked", async function () {
        // Insert a registration number to populate the table
        await query.insertRegNum('ca 457', 1);

        // Get the initial number of registration numbers
        let initialResults = await query.getRegNum();
        const initialCount = initialResults.length;

        // Click the "reset" button or call the function that resets the table
        await query.deleteFromTable();

        // Re-query the database to check if the registration numbers have been cleared
        const clearedResults = await query.getRegNum();

        // Assert that the number of registration numbers after resetting is 0
        assert.equal(clearedResults.length, 0);
    });


});