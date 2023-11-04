import "@stdlib/deploy";

contract KiddiesC with Deployable {
            val: Int as unit32;
    init() {
        self.val = 0;

        
    }

    receive("addkiddies"){
        self.val  = self.val +1;
    }

    get fun countkiddie(): Int{
        return self.val;
    }
}
