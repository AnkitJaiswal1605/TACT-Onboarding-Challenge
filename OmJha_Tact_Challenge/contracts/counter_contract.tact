import "@stdlib/deploy";

contract CounterContract with Deployable {
    id: Int as uint32;
    val: Int as uint32;
    init(id: Int) {
        self.val = 0;
        self.id = id;
    }

    receive("increment") {
        self.val = self.val + 1;
    }

    get fun counter(): Int {
        return self.val;
    }

    get fun id(): Int {
        return self.id;
    }
}
// OM JHA