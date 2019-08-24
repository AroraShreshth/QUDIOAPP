const SHA256 = require('crypto-js/sha256');
class Block {
    constructor( index, timestamp, data,previousHash =''){
        this.index =index;
        this.timestamp =timestamp;
        this.data =data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    calculateHash (){
        return SHA256(this.index + this.previousHash +this.timestamp+ JSON.stringify(this.data) + this.nonce).toString();
    }


}

class Blockchain {
    constructor() {
        this.chain =[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        var b = new Block(0, "21/02/2019","Genesis block", "0");
        b.hash = b.calculateHash();
        return b;
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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
cryptoCoin.addBlock(new Block(1, "21/02/2019", {from: '1', to: '2',amount: 5}));
cryptoCoin.addBlock(new Block(2, "21/02/2019", {from: '2', to: '1',amount: 10}));
cryptoCoin.addBlock(new Block(3, "21/02/2019", {from: '3', to: '1',amount: 7}));



console.log('Is Block chain valid ' + cryptoCoin.isChainValid());
console.log(JSON.stringify(cryptoCoin, null,4));

cryptoCoin.chain[2].data = {from: '2', to: '1',amount: 20};
console.log('Is Block chain valid? ' + cryptoCoin.isChainValid());
