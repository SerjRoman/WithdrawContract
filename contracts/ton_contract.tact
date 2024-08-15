import "@stdlib/deploy";

message Withdraw {
    amount: Int as coins;
}

contract TonContract with Deployable {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //
    const MinTonForStorage: Int = ton("0.1");
    owner: Address;
    id: Int as uint32;
    
    init(id: Int) {
        self.id = id;
        self.owner = sender();
    }
    fun isOwner() {
        
        require(self.owner == sender(), "Receiver must be an owner");
    }
    receive() {
    }
    receive(msg: Withdraw) {
        self.isOwner();
        let amount: Int = myBalance() - context().value - self.MinTonForStorage;
        require(msg.amount > 0, "Balance is null");
        send(SendParameters{
            to: self.owner,
            value: amount,
            mode: SendIgnoreErrors + SendRemainingValue,
            bounce: true
        });
    }
    get fun balance(): String {
        return myBalance().toCoinsString();
    }
    get fun id(): Int{
        return self.id;
    }
}
