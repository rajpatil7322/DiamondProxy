const { expect } = require('chai')

function getSelectors (contract) {
    // get the function signatures from the ABI of the contract:
    const signatures = Object.keys(contract.interface.functions)
    // convert from signature to selector:
    const selectors = signatures.reduce((acc, val) => {
      acc.push(contract.interface.getSighash(val))
      return acc
    }, [])
    return selectors
  }

  describe('Create a Simple Diamond Contract', async function () {
    let diamond
    let tx
    let receipt
    let alice
    let bob
  
    /* Before each test - run this setup */
    before(async function () {
  
      [contractOwner, alice, bob] = await ethers.getSigners();
  
      // deploy simple Diamond
      const Diamond = await ethers.getContractFactory('Diamond')
      diamond = await Diamond.deploy(contractOwner.address)
      await diamond.deployed()
  
      console.log('Diamond deployed:', diamond.address)
      console.log(contractOwner.address)
    })
  
    /*================================================================*/
    /***************               NFT FACET               ************/
    /*================================================================*/
  
    // it('should add the NFT facet', async () => {
  
    // })
})
