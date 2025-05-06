// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import './ChallengeOwnership.sol';

/// @title CryptoChallenges: Challenges on the Ethereum Blockchain.
/// @author Panagiotis Papadatis (https://github.com/ppapadatis)
/// @dev The main CryptoChallenges contract.
contract ChallengeCore is ChallengeOwnership {
    // This is the main CryptoChallenges contract.
    // The core contract is breaked up into multiple files using inheritence, one for each major
    // facet of functionality. This allows us to keep related code bundled together while still
    // avoiding a single giant file with everything in it. The breakdown is as follows:
    //
    //      - ChallengeAccessControl: This contract manages the various addresses and constraints for operations
    //             that can be executed only by specific roles.
    //
    //      - ChallengeBase: This is where we define the most fundamental code shared throughout the core
    //             functionality. This includes our main data storage, constants and data types, plus
    //             internal functions for managing these items.
    //
    //      - ChallengeOwnership: This facet contains the functionality we use for managing challenges.

    /// @notice Creates the main CryptoChallenges smart contract instance.
    constructor() {
        serviceOwner = msg.sender;
        minimumStake = 0.015 ether;
    }

    /// @notice No tipping!
    /// @dev Reject all Ether from being sent here.
    receive() external payable {
        require(false, 'No tipping allowed');
    }

    /// @dev Creates a new challenge for the requested address.
    /// @notice The minimum amount to stake is 2 finney.
    ///
    /// @param _goal The challenge's goal.
    /// @param _deadline The challenge's deadline.
    /// @param _supervisor The challenge's supervisor.
    /// @param _email The signer's encrypted email
    /// @param _supervisorEmail The supervisor's encrypted email
    function createChallenge(string memory _goal, uint _deadline, address _supervisor, string memory _email, string memory _supervisorEmail) public payable returns (uint) {
        require(bytes(_goal).length > 0, 'Goal must not be null or empty');
        require(_deadline >= block.timestamp, 'Deadline must be greater than current block time');
        require(_supervisor != address(0), 'Supervisor address must not be null');
        require(_supervisor != msg.sender, 'The Creator and the Supervisor address must be different');
        require(msg.sender != address(0), 'Creator address must not be null');
        require(msg.value >= minimumStake, 'The minimum stake is not met');
        //require(bytes(_email).length > 0, "Signer's email must not be null or empty");
        //require(bytes(_supervisorEmail).length > 0, "Supervisor's email must not be null or empty");

        return _createChallenge(_goal, _deadline, _supervisor, msg.value, msg.sender, _email, _supervisorEmail);
    }

    /// @notice Returns all the relevant information about a specific challenge.
    ///
    /// @param _challengeId The ID of the challenge of interest.
    /// @return goal The challenge's goal.
    /// @return deadline The challenge's deadline.
    /// @return supervisor The address of the challenge's supervisor.
    /// @return stake The stake associated with the challenge.
    /// @return state The state of the challenge.
    function getChallenge(
        uint _challengeId
    ) external view returns (string memory goal, uint deadline, address supervisor, uint stake, ChallengeState state) {
        Challenge storage challenge = challenges[_challengeId];
        return (challenge.goal, challenge.deadline, challenge.supervisor, challenge.stake, challenge.state);
    }
}
