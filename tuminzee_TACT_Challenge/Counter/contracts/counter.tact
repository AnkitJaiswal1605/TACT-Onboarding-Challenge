import "@stdlib/deploy";

contract Counter with Deployable {
    id: Int as uint32;
    val: Int as uint32;
    init(id: Int){
        self.id = id;
        self.val = 0;
    }

    receive("increment"){
        self.val = self.val + 1;
    }

    get fun counter(): Int {
        return self.val;
    }
}