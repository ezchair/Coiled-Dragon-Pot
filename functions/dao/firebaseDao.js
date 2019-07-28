const admin = require('firebase-admin')
const config = require('../config')

class FirebaseDao{
    
    constructor(){
        const { NODE_ENV='development' } = process.env;
        const {credential, databaseURL} = config[NODE_ENV].firebase;
        
        this.firebase = null;
        if(admin.apps.length > 0){
            this.firebase = admin.apps[0].database()
        }
        else{
            this.firebase = admin.initializeApp({
                credential: admin.credential.cert(credential),
                databaseURL
            }).database()
        }
    }

    search(url){
        this._check()
        return this.firebase.ref(url).once('value')
    }

    update(url, updateData){
        this._check()
        return this.firebase.ref(url).update(updateData)
    }

    _check(){
        if(this.firebase == null){
            throw new Error("firebase is not initial")
        }
    }
}

module.exports = FirebaseDao