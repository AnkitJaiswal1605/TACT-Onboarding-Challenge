import "@stdlib/deploy";

contract Counter with Deployable {
    val: Int as uint32;
    init(){
        self.val = 0; 
    }
    get fun counter():Int{
        return self.val;
    }
    receive("increament"){
        self.val = self.val +  1;
    }
    receive("decreament"){
        self.val = self.val -  1;
    }

}