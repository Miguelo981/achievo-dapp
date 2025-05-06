// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import './ChallengeBase.sol';

/// @title Ownership contract for CryptoChallenges. Holds all common functionality.
/// @author Panagiotis Papadatis (https://github.com/ppapadatis)
/// @dev See the ChallengeCore contract documentation to understand how the various contract facets are arranged.
contract ChallengeOwnership is ChallengeBase {
    /// @dev Checks if a given address is the current owner of a particular challenge.
    ///
    /// @param _claimant The address we are validating against.
    /// @param _challengeId The challenge's ID.
    /// @return bool True, if the claimant is the owner of the challenge.
    function _owns(address _claimant, uint _challengeId) internal view returns (bool) {
        require(_claimant != address(0), 'Owner address must not be null');
        return challengeIndexToOwner[_challengeId] == _claimant;
    }

    /// @dev Checks if the given address is a supervisor for the given challenge.
    ///
    /// @param _supervisor The address to check for.
    /// @param _challengeId The ID of the challenge.
    /// @return bool True, if the address is a supervisor.
    function _supervises(address _supervisor, uint _challengeId) internal view returns (bool) {
        require(_supervisor != address(0), 'Supervisor address must not be null');
        return challenges[_challengeId].supervisor == _supervisor;
    }

    /// @dev Checks if the given challenge is in progress and on time.
    ///
    /// @param _challengeId The ID of the challenge.
    /// @return bool True, if the challenge is in progress and on time.
    function _inProgress(uint _challengeId) internal view returns (bool) {
        return
            challenges[_challengeId].state == ChallengeState.InProgress &&
            challenges[_challengeId].deadline >= block.timestamp;
    }

    /// @dev Returns the owner of the given challenge ID.
    ///
    /// @param _challengeId The ID of the challenge.
    /// @return address The address of the owner.
    function getOwnerOfChallenge(uint _challengeId) public view returns (address) {
        return challengeIndexToOwner[_challengeId];
    }

    /// @dev Returns the total number of challenges.
    ///
    /// @return uint The total number of challenges.
    function getTotalChallenges() public view returns (uint) {
        return challenges.length;
    }

    /// @notice Returns the number of Challenges owned by a specific address.
    ///
    /// @return uint The number of challenges owned by the address.
    function getNumberOfChallenges(address _owner) public view returns (uint) {
        return ownershipChallengeCount[_owner];
    }

    /// @notice This method MUST NEVER be called by smart contract code.
    ///  It's expensive because it walks the entire challenges array and also
    ///  returns a dynamic array, which is only supported for web3 calls.
    /// @dev Returns a list of all Challenge IDs assigned to an address.
    ///
    /// @return uint[] An array of all challenges owned by a given address.
    function getChallengesOfOwner() external view returns (uint[] memory) {
        uint balance = getNumberOfChallenges(msg.sender);

        if (balance == 0) {
            return new uint[](0);
        }

        uint[] memory result = new uint[](balance);
        uint totalChallenges = getTotalChallenges();
        uint resultIndex = 0;

        for (uint challengeIndex = 0; challengeIndex < totalChallenges; challengeIndex++) {
            if (challengeIndexToOwner[challengeIndex] == msg.sender) {
                result[resultIndex] = challengeIndex;
                resultIndex = resultIndex + 1;
            }
        }

        return result;
    }

    /// @dev Grant the supervisor of the challenge to mark is as confirmed.
    ///
    /// @param _challengeId The ID of the challenge.
    function confirmChallenge(uint _challengeId) public {
        require(_supervises(msg.sender, _challengeId), 'Cannot confirm unauthorized challenges');
        require(_inProgress(_challengeId), 'Can only confirm challenges in-progress');

        Challenge storage challenge = challenges[_challengeId];
        challenge.state = ChallengeState.Confirmed;
        emit Confirmed(
            challengeIndexToOwner[_challengeId],
            _challengeId,
            challenge.goal,
            challenge.deadline,
            msg.sender,
            challenge.stake,
            challenge.email,
            challenge.supervisorEmail
        );
    }

    /// @dev Grants the challenge's owner to withdraw the stake
    ///  as long as the challenge if confirmed as fulfilled.
    ///
    /// @param _challengeId The ID of the challenge.
    function withdrawStake(uint _challengeId) public {
        require(_owns(msg.sender, _challengeId), "Must be the challenge's owner in order to withdraw the stake");
        require(
            challenges[_challengeId].state == ChallengeState.Confirmed,
            'Cannot claim stake on unfulfilled challenges'
        );

        Challenge storage challenge = challenges[_challengeId];
        challenges[_challengeId].state = ChallengeState.Fulfilled;
        msg.sender.transfer(challenge.stake);
        emit Fulfilled(
            msg.sender,
            _challengeId,
            challenge.goal,
            challenge.deadline,
            challenge.supervisor,
            challenge.stake
        );
    }

    /// @dev Grants the service owner the ability to claim the stake
    ///  of the expired and unfulfilled challenge.
    function claimStake(uint _challengeId) public onlyServiceOwner {
        require(!_inProgress(_challengeId), 'Challenge must have missed the deadline');

        Challenge storage challenge = challenges[_challengeId];
        require(challenge.state != ChallengeState.Confirmed, 'Confirmed challenges cannot be claimed');
        require(challenge.state != ChallengeState.Fulfilled, 'Fulfilled challenges cannot be claimed');
        require(challenge.state != ChallengeState.Expired, 'Expired challenges cannot be claimed');

        challenge.state = ChallengeState.Expired;
        serviceOwner.transfer(challenge.stake);
        emit Expired(
            challengeIndexToOwner[_challengeId],
            _challengeId,
            challenge.goal,
            challenge.deadline,
            challenge.supervisor,
            challenge.stake
        );
    }
}
