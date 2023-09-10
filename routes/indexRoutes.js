export default function showHome(regNumQuery,) {

    async function home(req, res) {
        let regNum = await regNumQuery.getRegNum();
        let errorMessage = req.flash('error')[0];
        let reset =  req.flash('clear')[0];

        // console.log(regNum);
                res.render('index', {
             regNum,
             errorMessage,
             reset


        })
    }
    return {
        home
    }
}