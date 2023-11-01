import "@stdlib/deploy";

contract CounterContract with Deployable {
    
    // variables to hold the value of the id and counter
    id: Int as uint32;
    val: Int as uint32;
    
    // sets initial value of val as 0 during deployment
    init(id: Int) {
        self.id = id;
        self.val = 0;
    }

    // increases the value of val by 1
    receive("increment") {
        self.val = self.val + 1;
    }

    // reads the current value of val
    get fun counter(): Int {
        return self.val;
    }

    get fun id(): Int {
        return self.id;
    }
}
