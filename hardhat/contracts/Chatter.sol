// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Chatter {
    event NewMessage(address indexed user, string message);

    function chat(string memory _message) public {
        emit NewMessage(msg.sender, _message);
    }
}
