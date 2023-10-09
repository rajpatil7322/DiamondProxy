// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {LibFacetB} from "../libraries/LibFacetB.sol";


contract FacetB {

    function sub(uint256 _num) external returns(bool){
        return LibFacetB.sub(_num);
    }

    function getNum() public view returns(uint256){
        return LibFacetB.getStorage().b;
    }
}