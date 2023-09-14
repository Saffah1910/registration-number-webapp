export default function AddRegNums(dbLogic, frontEndLogic) {

  async function add(req, res) {
    //this takes the vlaue from the input
    let registration = req.body.car_registration;
    // console.log(registration);

    let valid = frontEndLogic.checkRegNum(registration);
    // console.log(valid);
    if (valid) {
      await dbLogic.insertRegNum(registration.toUpperCase(), valid);
      // console.log('Registration number added successfully');
    }
    else {
      req.flash('error', frontEndLogic.setErrors(registration));


    }

    res.redirect('/')
  }
  async function filterTowns(req, res) {
    let townId = req.body.town;
    let regNum = await dbLogic.filter(townId);
    let filterError = await frontEndLogic.filterError();


    res.render("index", {
      regNum,
      filterError
    }
    )

  }

  async function clearAll(req, res) {
    req.flash('reset', 'Registartion Numbers have cleared');
    await dbLogic.deleteFromTable();

    res.redirect('/');
  }

  return {
    add,
    filterTowns,
    clearAll
  }
}