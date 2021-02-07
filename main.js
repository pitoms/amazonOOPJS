//warehouse
// sellerson the platform
// users who are buyers 

// is ecommerce prime member
// delivery charge calc dependent on member type

// Sellers care about easily adding new products and
// their store's performance analytics. They want an easy way to
// interact with the customer.

// Buyers want to perform a quick product search and sort on those items
// Important to keep products at a top level of access for this user behavior
//  

// A robust transactions process will be handy if users scale.
// Check stock before checkout to prevent checkout collisions type thing
// But this isn't as important





class User {
    // add one  constructor with optional parameters at the end in an array
    constructor(name, pass){
        this.id = uidGet("USER");
        this.name = name;
        this.pass = pass;
    }

    print(){
        console.log(`------`);
        for(const property in this){
            console.log(`${this[property]} `);
        }
    }

}

class Buyer extends User{
    constructor(name, pass){
        super(name, pass);
    }

    grantPrime(){
        this.prime = true;
    }

    revokePrime(){
        this.prime = false;
    }
}

// For this sim we're keeping it simple and assuming a seller
// can only have one store and a store can only have
// one owner (1 to 1 relationship btwn Seller and Store)
class Seller extends User{

}

// An object responsible for each unique product on Amazon()
// We keep products accessible on the top level
// because we need to touch this data frequently
class Product{
    constructor(name, price, department, location, stock){
        this.name = name;
        this.reviews = [];
        this.price = price;
        this.department = department;
        this.location = location;
        this.stock = stock;
        this.id = uidGet("Product");

    }
}

// A single product can be sold by many stores
//  
class StoreProduct extends Product{
    constructor(name, price, department, location, stock, prodID, storeID){
        super(name, price, department, location, stock);
        // With this design pattern we can have many products
        // that share name, id, but have different prices and sellers
        // 

        this.storeID = storeID;
    }
}




// An object responsible for holding payment information
// Since this is a sim we're super simplifying it 
// Types: AMEX, VISA, MSTR (MasterCard), PYPL (Paypal), GIFT (Gift Card)
// accID is the UID for the payment type (either card # or account number)
// A balance attribute has been added to make the checkout process have some logic lol
//
class PaymentMethod{
    constructor(type, accID){
        switch(type) {
            case "AMEX":
              this.type = "AMEX";
              break;
            case "VISA":
              this.type = "VISA"
              break;
            case "MSTR":
              this.type = "MSTR";
              break;
            case "PYPL":
              this.type = "PYPL";
              break;
            case "GIFT":
              this.type = "GIFT";
              break;
            default:
              throw new Error('Invalid payment type provided.');
          }
          this.id = accID;
          this.balance = 500; // amazon stimmy money
    }
}

class Transaction{
    constructor(paymentMethod, product, userID){
        

    }
}


const idCount = new Map(); // (key = type, value = count)
function uidGet(type){
    // Takes a string type and return the next available ID for the specific type
    // uidGet(user) --> returns a uid for a user
    if(idCount.has(type))
    {
        let currentCount = idCount.get(type);
        idCount.set(type, currentCount + 1);

        return currentCount + 1;
    }
    else{
        idCount.set(type,1);
        return 1;
    }
}






startAmazonSim();
let mode = "Buyer"; // Switch between a buyer or seller sim

function startAmazonSim(){

    // Driver function testing functionality of Amazon services design
    //

    let myCard = new PaymentMethod("PYPL", uidGet("Pay"));
    let myCard2 = new PaymentMethod("VISA", uidGet('Pay'));
    console.log(myCard, myCard2);

    let pitom = new Buyer("pitoms", "soopersecurepass");
    pitom.grantPrime();
    pitom.print();


}