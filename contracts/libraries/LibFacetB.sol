/// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

library LibFacetB {
    bytes32 constant STORAGE_POSITION = keccak256("facet.b.diamond.storage");

    struct Storage {
        uint256 b;
    }

    function getStorage() internal pure returns (Storage storage ds) {
        bytes32 position = STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function sub(uint256 _num) internal returns(bool){
        Storage storage ds=getStorage();
        unchecked{
            ds.b-=_num;
        }
        return true;
    }
}