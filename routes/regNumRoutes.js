export default function AddRegNums(dbLogic, frontEndLogic) {
 
    async function add(req, res) {
      //this takes the vlaue from the input
        let registration = req.body.car_registration;
        // console.log(registration);
        let valid = frontEndLogic.checkRegNum(registration);
      
        if (valid) {
          await dbLogic.insertRegNum(registration.toUpperCase(), valid);
          console.log('Registration number added successfully');
        } else {
          console.log('Invalid registration number');
        }
        res.redirect('/')
      }

    // async function show(req,res){

    // }
      
    async function clearAll(req, res) {
        await dbLogic.deleteFromTable();
        res.redirect('/');
    }

    return {
        add,
 
        clearAll
    }
}