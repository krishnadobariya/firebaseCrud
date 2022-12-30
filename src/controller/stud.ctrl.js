
const { db,admin } = require("../util/admin");
exports.stud = async (req, res) => {
    const studRef = db.collection('stud');
    try {
        studRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(data);
            return res.status(201).json(data);
        })
    } catch (error) {
        return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
    }
};
exports.addData = async (req, res) => {
try {
    var name = req.body.student_name
    var email = req.body.student_email
    var phone = req.body.student_phone
    var dob = req.body.student_dob
    var gender = req.body.student_gender
    console.log("bzn",typeof gender);
    if(name==null){
        res.status(403).send("name is required...!!!!");
    }
    else if(phone.length!=10){
        res.status(403).send("insert valid phone number...!!!!");
    }
    else if(gender==null){
        res.status(403).send("gender is required...!!!!");
    }
    else if(dob==null){
        res.status(403).send("dob is required...!!!!");
    }
    else{


        
   
    
        const user = req.body;
        
        console.log("user",user);
      
        await db.collection("stud").add(user);
      
        res.status(201).send(JSON.stringify({user}));
   




        
    }
    
    
} catch (error) {
    console.log(error);
    return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
    }

}
exports.viewById = async(req,res)=>{
    try {
        const snapshot = await admin.firestore().collection('stud').doc(req.params.id).get();

        const userId = snapshot.id;
        const userData = snapshot.data();
    console.log(userData);
    if(userData == undefined){
        res.status(404).send("not found");

    }
    else{
        res.status(200).send(JSON.stringify({...userData}));

    }
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
}
exports.deleteById = async(req,res) => {
    try {

        const snapshot = await admin.firestore().collection('stud').doc(req.params.id).get();
        const userData = snapshot.data();
        console.log("----",userData);
if(userData==undefined){
    res.status(404).send("not found");
    
}
else{
    await admin.firestore().collection("stud").doc(req.params.id).delete();
    res.status(200).send(JSON.stringify({id: userId, ...userData}));


}

    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
}
exports.updateById = async(req,res)=>{
    try {
        const snapshot = await admin.firestore().collection('stud').doc(req.params.id).get();
        const userData = snapshot.data();

        const body = req.body;

        if(userData==undefined){
            res.status(404).send("not found");
            
        }
        else{
            await admin.firestore().collection('stud').doc(req.params.id).update(body);
            res.status(200).send("successfully updated..!!!");
        }
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
}