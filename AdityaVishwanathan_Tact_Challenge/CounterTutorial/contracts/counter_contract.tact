import "@stdlib/deploy";

contract CounterContract with Deployable {
    val: Int as uint32;
    init() {
        self.val = 0;
    }

    receive("increment"){
        self.val = self.val+1;
    }

    get fun counter(): Int {
        return self.val;
    }
}
