const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty)!== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined:" +this.hash)
    }

}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;

        // Place to store transactions in between block creation
        this.pendingTransactions = [];

        // How many coins a miner will get as a reward for his/her efforts
        this.miningReward = 100;
    }
    createGenesisBlock(){
        var b = new Block(0, "21/02/2019","Genesis block", "0");
        b.hash = b.calculateHash();
        return b;
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    /*addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } */
    createTransaction(transaction) {
        // There should be some validation here!
    
        // Push into onto the "pendingTransactions" array
        this.pendingTransactions.push(transaction);
    }
    minePendingTransactions(miningRewardAddress) {
        // Create new block with all pending transactions and mine it..
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
    
        // Add the newly mined block to the chain
        this.chain.push(block);
    
        // Reset the pending transactions and send the mining reward
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }
    getBalanceOfAddress(address){
        let balance = 0; // you start at zero!
    
        // Loop over each block and each transaction inside the block
        for(const block of this.chain){
            for(const trans of block.transactions){
    
                // If the given address is the sender -> reduce the balance
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
    
                // If the given address is the receiver -> increase the balance
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
    
        return balance;
    }
    isChainValid(){
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let cryptoCoin = new Blockchain();

console.log('Creating Transactions ....');
cryptoCoin.createTransaction(new Transaction('address1', 'address2', 100));
cryptoCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
cryptoCoin.minePendingTransactions('A-address');
console.log('Balance of A address is', cryptoCoin.getBalanceOfAddress('A-address'));

console.log('Starting the miner again!');
cryptoCoin.minePendingTransactions("A-address");

console.log('Balance of A address is', cryptoCoin.getBalanceOfAddress('A-address'));

// Output: 100
/*
console.log('Mining block 1...');
cryptoCoin.addBlock(new Block(1, "21/02/2019", {from: '1', to: '2',amount: 5}));
console.log('Mining block 2...');
cryptoCoin.addBlock(new Block(2, "21/02/2019", {from: '2', to: '1',amount: 10}));
console.log('Mining block 3...');
cryptoCoin.addBlock(new Block(3, "21/02/2019", {from: '3', to: '1',amount: 7}));
*/


//console.log('Is Block chain valid ' + cryptoCoin.isChainValid());
console.log(JSON.stringify(cryptoCoin, null,4));

//cryptoCoin.chain[2].data = {from: '2', to: '1',amount: 20};
//console.log('Is Block chain valid? ' + cryptoCoin.isChainValid());
