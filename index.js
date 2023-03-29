// Import our tools we needfrom firebase-admin
import { initializeApp, cert } from "firebase-admin/app"; // we use to connect to our firebase project
import { getFirestore } from "firebase-admin/firestore"; // we use to connect to Firestore

// Import our credentials from a secret file
import { credentials } from "./credentials.js";

// Connect to our firebase project
initializeApp({
  credential: cert(credentials)
})

// Connect us to our Firestore DB (project)
const db = getFirestore();

// Add a product to our products collection
const candy2 = {
  name: "Twix",
  unitPrice: 3.99,
  size: "12 oz",
  color: "gold",
  inventory: 288,
  productNumber: 2,
}

// db.collection('products').add(candy2) // While we are waiting for a promise
//   .then((doc) => {
//     console.log("added doc: ",  doc.id)
//     // I can be sure inside .then that the first process was completed successfully
//    // return db.collection('products').get() // also returns a promise
//   })
//   //.then()
//   .catch(err => console.log(err))

// How to read a document from firestore:
db.collection('products').doc('RhCXJhq2fG1h9ljznl2f').get()
//db.collection('products').doc('RhCXJhq2fG1h9ljznl2f').delete()-How to delete
.then(doc => { // no parenthesis needed when only 1 param
  console.log(doc.data())
}) // you can call this whatever you want
.catch(err => console.log(err)) //can also be written >>> .catch(console.log) 

//how to update
db.collection('products').doc('RhCXJhq2fG1h9ljznl2f').update({
  inventory: 555,
  customerFavorite: true,
})


// How to get a whole collection
db.collection('products').get()
.then(collection =>{
  const productList = collection.docs.map(doc =>({...doc.data(), id: doc.id}));
  console.table(productList);
})
.catch(console.log)