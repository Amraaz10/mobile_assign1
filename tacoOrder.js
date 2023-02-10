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
    SIDE: Symbol("side"),
    DIPPING:Symbol("dipping"),
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
        this.sSide="";
        this.sDipping = "";
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
                this.stateCur = OrderState.SIDE
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
                aReturn.push("What side item would you like to have? ");
                aReturn.push("Fries=$5,Poutine=$7,Onion rings=$9 ");
                aReturn.push("Press F for fries, P for Poutine, O for onion rings");
                aReturn.push("Press 'No' if you do not want to add any side item ");

                break;

                //case for non veg taco size
                case OrderState.NONSIZE:
                    this.stateCur = OrderState.SIDE
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
                         aReturn.push("What side item would you like to have? ");
                         aReturn.push("Fries=$5,Poutine=$7,Onion rings=$9 ");
                         aReturn.push("Press F for fries, P for Poutine, O for onion rings");
                         aReturn.push("Press 'No' if you do not want to add any side item ");
                    break;

                 
                    //Side case   
                case OrderState.SIDE:
                    this.stateCur= OrderState.DIPPING
                    this.sSide=sInput;
                    if(this.sSide =="f" || this.sSide== "F"){
                        this.price= this.price + 5;
                    }
                    else if(this.sSide =="p" || this.sSide== "P"){
                        this.price= this.price + 7;
                    }
                    else if(this.sSide =="o" || this.sSide == "O"){
                        this.price= this.price + 9;
                    }
                    else if(this.sSide =="no" || this.sSide == "NO" || this.sSide == "No" || this.sSide == "nO" ){
                        this.price= this.price + 0;
                    }
                    else{
                        this.stateCur=OrderState.SIDE;
                        this.sSize=sInput;
                        aReturn.push("INVALID INPUT!! PRESS 'F' or 'P' or 'O' or 'NO'  ");
                        break;
                         }
                    aReturn.push("Add any dipping for $1 ");
                    aReturn.push(" Dippings availaible - Mayo, Ranch, Chipotle ");
                    aReturn.push(" Press 'M' for mayo, 'R' for ranch, 'C' for chipotle ");
                    aReturn.push("Press 'No' if you do not want any dipping ");

                   break;



                    //toppings case
                 case OrderState.DIPPING:
                this.stateCur = OrderState.DRINKS
                this.sDipping = sInput;
                if(this.sDipping =="m" || this.sDipping== "M"){
                    this.price= this.price + 1;
                }
                else if(this.sDipping =="r" || this.sDipping== "R"){
                    this.price= this.price + 1;
                }
                else if(this.sDipping =="c" || this.sDipping == "C"){
                    this.price= this.price + 1;
                }
                else if(this.sDipping =="no" || this.sDipping == "NO" || this.sDipping == "No" || this.sDipping == "nO" ){
                    this.price= this.price + 0;
                }
                else{
                    this.stateCur=OrderState.DIPPING;
                    this.sDipping=sInput;
                    aReturn.push("INVALID INPUT!! PRESS 'M' or 'R' or 'C' or 'NO'  ");
                    break;
                     }     
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
                aReturn.push(`of ${this.sSize} ${this.sItem} `);



                //dippings output print 
                if(this.sDipping=='c' || this.sDipping=='C'){
                    this.sDipping="chipotle";
                    aReturn.push(`with dipping- ${this.sDipping} `);
                    }
                    else if(this.sDipping=='r' || this.sDipping=='R')
                    {
                    this.sDipping="ranch";
                      aReturn.push(`with dipping- ${this.sDipping} `);
                    }
                    else if(this.sDipping=='m' || this.sDipping=='M')
                    {
                    this.sDipping="mayo" ;
                    aReturn.push(`with dipping- ${this.sDipping} `);
                    }
                    else{
                        this.sDipping="(no dipping selected) ";
                        aReturn.push(` ${this.sDipping} `);
                        }

                
                
                //side item output print
                if(this.sSide=='f' || this.sSide=='f'){
                this.sSide="fries";
                aReturn.push(`with side item - ${this.sSide} `);
                }
                else if(this.sSide=='p' || this.sSide=='P')
                {
                this.sSide="poutine";
                  aReturn.push(`with side item - ${this.sSide} `);
                }
                else if(this.sSide=='o' || this.sSide=='0')
                {
                this.sSide="onion rings" ;
                aReturn.push(`with side item - ${this.sSide} `);
                }

                else{
                    this.sSide="no side item selected ";
                    aReturn.push(`- ${this.sSide} `);
                    }


                // drink item output print
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
