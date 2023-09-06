export default function showHome(regNumQuery) {

    async function home(req, res) {
        let regNum = await regNumQuery.getRegNum();
        // console.log(regNum);
                res.render('index', {
             regNum
        })
    }
    return {
        home
    }
}