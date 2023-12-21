import "@stdlib/deploy";
contract CounterContract with Deployable {
    count: Int as uint32;

    init() {
        self.count = 0;
    }

    receive("increament") {
        self.count = self.count + 1;
    }

    get fun counter(): Int {
        return self.count;
    }
}
