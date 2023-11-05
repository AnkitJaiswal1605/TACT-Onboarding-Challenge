import "@stdlib/deploy";

contract CounterContract with Deployable {
    id: Int as uint32;
    val: Int as uint32;

    get fun counter(): Int {
        return self.val;
    }
    receive("increment") {
        self.val = self.val + 1;
    }


    init(id:Int) {
        self.id =id;
        self.val = 0;
    }

    get fun id(): Int {
        return self.id;
    }
}
