// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import './ChallengeAccessControl.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

/// @title Base contract for CryptoChallenges. Holds all common structs, events and base variables.
/// @author Panagiotis Papadatis (https://github.com/ppapadatis)
/// @dev See the ChallengeCore contract documentation to understand how the various contract facets are arranged.
contract ChallengeBase is ChallengeAccessControl {
    /*** Libraries ***/
    using SafeMath for uint256;

    /*** EVENTS ***/

    /// @dev The Created event is fired whenever a new challenge comes into existence.
    event Created(
        address indexed owner,
        uint indexed challengeId,
        string goal,
        uint deadline,
        address indexed supervisor,
        uint stake,
        string email,
        string supervisorEmail
    );

    /// @dev The Confirmed event is fired when a supervisor approves a challenge.
    event Confirmed(
        address indexed owner,
        uint indexed challengeId,
        string goal,
        uint deadline,
        address indexed supervisor,
        uint stake,
        string email,
        string supervisorEmail
    );

    /// @dev The Fulfilled event is fired when a challenge is marked fulfilled.
    event Fulfilled(
        address indexed owner,
        uint indexed challengeId,
        string goal,
        uint deadline,
        address indexed supervisor,
        uint stake
    );

    /// @dev The Expired event is fired when a challenge is expired.
    event Expired(
        address indexed owner,
        uint indexed challengeId,
        string goal,
        uint deadline,
        address indexed supervisor,
        uint stake
    );

    /*** DATA TYPES ***/

    // The lifecycle of a challenge.
    enum ChallengeState {
        InProgress,
        Confirmed,
        Fulfilled,
        Expired
    }

    /// @dev The main Challenge struct
    struct Challenge {
        // A description for the goal to achieve.
        string goal;
        // A unix timestamp representing the date until the challenge is considered in-progress.
        uint deadline;
        // The value to stake until fulfilled.
        uint stake;
        // The state of the challenge.
        ChallengeState state;
        // Supervisor's address.
        address supervisor;
        // Signer's encrypted email
        string email;
        // Supervisor's encrypted email
        string supervisorEmail;
    }

    /** STORAGE ***/

    /// @dev An array containing the Challenge struct for all challenges in existence.
    Challenge[] internal challenges;

    /// @dev A mapping from challenge IDs to the address that owns them.
    mapping(uint => address) public challengeIndexToOwner;

    /// @dev A mapping from owner address to count of challenges that address owns.
    mapping(address => uint) internal ownershipChallengeCount;

    /// @dev Assigns ownership of a specific Challenge to an address.
    ///
    /// @param _to The address to transfer to.
    /// @param _challengeId The challenge index to transfer.
    //address _from,
    function _transfer(address _to, uint _challengeId) internal {
        ownershipChallengeCount[_to] = ownershipChallengeCount[_to].add(1);
        challengeIndexToOwner[_challengeId] = _to;
    }

    /// @dev An internal method that creates a new Challenge and stores it. This
    ///  method doesn't do any checking and should only be called when the
    ///  input data is known to be valid.
    ///
    /// @param _goal The challenge's goal.
    /// @param _deadline The challenge's deadline.
    /// @param _supervisor Supervisor's address.
    /// @param _stake The challenge's stake value.
    /// @param _owner The inital owner of this challenge, must be non-zero.
    /// @param _email The challenge's owner encrypted email.
    /// @param _supervisorEmail The challenge's supervisor encrypted email.
    /// @return uint The challenge's id.
    function _createChallenge(
        string memory _goal,
        uint _deadline,
        address _supervisor,
        uint _stake,
        address _owner,
        string memory _email,
        string memory _supervisorEmail
    ) internal returns (uint) {
        Challenge memory _challenge = Challenge({
            goal: _goal,
            deadline: _deadline,
            stake: _stake,
            state: ChallengeState.InProgress,
            supervisor: _supervisor,
            email: _email,
            supervisorEmail: _supervisorEmail
        });

        challenges.push(_challenge);
        uint newChallengeIndex = challenges.length - 1;

        _transfer(_owner, newChallengeIndex);
        emit Created(_owner, newChallengeIndex, _goal, _deadline, _supervisor, _stake, _email, _supervisorEmail);

        return newChallengeIndex;
    }
}
