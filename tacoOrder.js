class Order{
    constructor(){
        this.bDone = false;
    }
    isDone(bDone){
        if(bDone){
            this.bDone = bDone;
        }
        return this.bDone;
    }
}
const OrderState = Object.freeze({
    WELCOMING:  Symbol("welcoming"),
    NAME: Symbol("name"),
    VEG: Symbol("veg"),
    NONVEG: Symbol("nonveg"),
    OPTION: Symbol("option"),
    VEGSIZE: Symbol("Vegsize"),
    NONSIZE: Symbol("Nonveg size"),
    TOPPINGS: Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class TacoOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sName="";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sOption="";
        this.sItem1 = "veg-taco";
        this.sItem2="nonveg-taco";
        this.sItem="Taco"
        this.price=0;

    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            // case for welcoming
        case OrderState.WELCOMING:   
        this.stateCur=OrderState.NAME;
            aReturn.push("Welcome to Taco bell");
            aReturn.push("Enter your  Name ");
            break;
            
            // case for name 
            case OrderState.NAME:
                this.stateCur = OrderState.OPTION;
                this.sName=sInput;
                aReturn.push("What Taco would you like to have. VEG OR NON-VEG ?");
                aReturn.push("Press '1' for VEG Taco and '2' for NON-VEG Taco");
            break;
                
                // case for veg/nonveg selection
                case OrderState.OPTION:
                this.sOption=sInput;
                if(sInput==1){
                    this.stateCur=OrderState.VEGSIZE;
                    this.sOption=sInput;
                    aReturn.push("what size of Veg-taco would you like?")
                    aReturn.push("Small=$5,Medium=$10,Large=$15")
                    aReturn.push("Press 'S' for small, 'M' for medium, 'L' for large")
                }
                else if(sInput==2){
                    this.stateCur=OrderState.NONSIZE;
                    this.sOption=sInput;
                    aReturn.push("what size of non-veg taco would you like?")
                    aReturn.push("Small=$6,Medium=$11,Large=$16")
                    aReturn.push("Press 'S' for small, 'M' for medium, 'L' for large")
                }
                else{
                    this.stateCur=OrderState.OPTION;
                    this.sOption=sInput;
                    aReturn.push("INVALID INPUT!! SELECT '1' or '2'")
                }
                break;

                //case for veg taco size
                case OrderState.VEGSIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if(this.sSize =="s" || this.sSize== "S"){
                    this.price= this.price + 5;
                }
                else if(this.sSize =="m" || this.sSize== "M"){
                    this.price= this.price + 10;
                }
                else if(this.sSize =="l" || this.sSize== "L"){
                    this.price= this.price + 15;
                }
                else{
                    this.stateCur=OrderState.VEGSIZE;
                    this.sSize=sInput;
                    aReturn.push("INVALID INPUT!! PRESS 'S' or 'M' or 'L'");
                    break;
                    }
                aReturn.push("Would like any extra toppings or dressings? (like garlic sauce,mayo or anything else) ");
                break;

                //case for non veg taco size
                case OrderState.NONSIZE:
                    this.stateCur = OrderState.TOPPINGS
                    this.sSize = sInput;
                    if(this.sSize =="s" || this.sSize== "S"){
                        this.price= this.price + 6;
                    }
                    else if(this.sSize =="m" || this.sSize== "M"){
                        this.price= this.price + 11;
                    }
                    else if(this.sSize =="l" || this.sSize== "L"){
                        this.price= this.price + 16;
                    }
                    else{
                        this.stateCur=OrderState.NONSIZE;
                        this.sSize=sInput;
                        aReturn.push("INVALID INPUT!! PRESS 'S' or 'M' or 'L'");
                        break;
                         }
                    aReturn.push(" Would like any extra toppings or dressings? (like garlic sauce, mayo or anything else)  ");
                    break;

                    //toppings case
                 case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Grab any drink for 5$");
                aReturn.push("Would you like drinks with that?");
                aReturn.push("If no then type 'No' otherwise name of the drink ");
                 break;
            
                 //drinks case
                case OrderState.DRINKS:
                this.isDone(true);
                this.sDrinks = sInput;
                if(this.sDrinks == "no" || this.sDrinks=="NO" || this.sDrinks=="No" || this.sDrinks=="nO" ){
                    this.price=this.price + 0;
                }
                else{
                    this.price=this.price + 5;
                }
                //final
                aReturn.push(`Thank-you for your order ${this.sName} `);
                // size output print
                if(this.sSize=="s" || this.sSize=="S"){
                    this.sSize="small";
                }
                else if(this.sSize=="m" || this.sSize=="M"){
                    this.sSize="medium";
                }
                else{
                    this.sSize="large";
                }
                aReturn.push(`of ${this.sSize} ${this.sItem} with toppings ${this.sToppings} `);
                if(this.sDrinks == "no" || this.sDrinks=="NO" || this.sDrinks=="No" || this.sDrinks=="nO"){
                    aReturn.push("(no drinks selected)");
                }
                else{
                    aReturn.push ( ` and with drink -${this.sDrinks}`);
                }
                aReturn.push(`Total amount is $ ${this.price}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
       
        return aReturn;
      
    }
}
