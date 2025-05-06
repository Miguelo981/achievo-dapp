import { time, loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { decodeEventLog, getAddress, isAddress, parseEther } from 'viem'

describe('Challenge', function () {
  async function deployChallenge() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
    const deadline = BigInt(new Date().getTime() + ONE_YEAR_IN_SECS * 1000)
    const challengeAmount = parseEther('0.5')
    const goal = 'Lose 5kg in 1 week'
    const email = 'e9d076e97cb9f3741bced2d88ad8a7ec:67f47d3709b40850ddefd929245b3c2f'
    const supervisorEmail = 'b79244bf25ee92764a5e4e1ed7053e2a:ec08cd52fcb4d318238fdc8100d2cec7'

    const [owner, signer, supervisor] = await hre.viem.getWalletClients()
    const challenge = await hre.viem.deployContract('ChallengeCore', [])
    const publicClient = await hre.viem.getPublicClient()

    return {
      challenge,
      deadline,
      challengeAmount,
      owner,
      signer,
      supervisor,
      goal,
      email,
      supervisorEmail,
      publicClient,
    }
  }

  describe('Deployment', function () {
    it('Should deploy the Challenge contract', async function () {
      const { challenge } = await loadFixture(deployChallenge)

      expect(isAddress(challenge.address)).to.be.true
    })
  })

  describe('Functions', function () {
    describe('Events', function () {
      it('Should emit Created event on createChallenge', async function () {
        const { challenge, deadline, challengeAmount, supervisor, owner, goal, email, supervisorEmail, publicClient } =
          await loadFixture(deployChallenge)

        const txHash = await challenge.write.createChallenge(
          [goal, deadline, supervisor.account.address, email, supervisorEmail],
          {
            account: owner.account.address,
            value: challengeAmount,
          },
        )

        const txReceipt = await publicClient.waitForTransactionReceipt({ hash: txHash })

        const createdEvent = txReceipt.logs
          .map((log) => decodeEventLog({ abi: challenge.abi, data: log.data, topics: log.topics }))
          .find((parsedLog) => parsedLog?.eventName === 'Created')

        expect(createdEvent).to.not.be.undefined
        expect(createdEvent?.args).to.deep.equal({
          owner: getAddress(owner.account.address),
          challengeId: BigInt(0),
          goal,
          deadline,
          supervisor: getAddress(supervisor.account.address),
          stake: challengeAmount,
          email,
          supervisorEmail,
        })

        /* await expect().to.emit(challenge, "Created")
          .withArgs(owner.account.address, BigInt(0), goal, deadline, supervisor.account.address, challengeAmount); */
      })

      it('Should emit Confirmed event on confirmChallenge', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail, publicClient } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        const txHash = await challenge.write.confirmChallenge([BigInt(0)], { account: supervisor.account.address })
        const txReceipt = await publicClient.waitForTransactionReceipt({ hash: txHash })

        const fulfilledEvent = txReceipt.logs
          .map((log) => decodeEventLog({ abi: challenge.abi, data: log.data, topics: log.topics }))
          .find((parsedLog) => parsedLog?.eventName === 'Confirmed')

        expect(fulfilledEvent).to.not.be.undefined

        expect(fulfilledEvent?.args).to.deep.equal({
          owner: getAddress(signer.account.address),
          challengeId: BigInt(0),
          goal,
          deadline,
          supervisor: getAddress(supervisor.account.address),
          stake: challengeAmount,
          email,
          supervisorEmail,
        })
      })

      it('Should emit Fulfilled event on withdrawStake', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail, publicClient } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await challenge.write.confirmChallenge([BigInt(0)], { account: supervisor.account.address })

        const txHash = await challenge.write.withdrawStake([BigInt(0)], { account: signer.account.address })
        const txReceipt = await publicClient.waitForTransactionReceipt({ hash: txHash })

        const fulfilledEvent = txReceipt.logs
          .map((log) => decodeEventLog({ abi: challenge.abi, data: log.data, topics: log.topics }))
          .find((parsedLog) => parsedLog?.eventName === 'Fulfilled')

        expect(fulfilledEvent).to.not.be.undefined

        expect(fulfilledEvent?.args).to.deep.equal({
          owner: getAddress(signer.account.address),
          challengeId: BigInt(0),
          goal,
          deadline,
          supervisor: getAddress(supervisor.account.address),
          stake: challengeAmount,
        })

        /* await expect()
          .to.emit(challenge, "Fulfilled")
          .withArgs(signer.account.address, BigInt(0), goal, deadline, supervisor.account.address, challengeAmount); */
      })

      it('Should emit Expired event on claimStake', async function () {
        const {
          challenge,
          deadline,
          challengeAmount,
          supervisor,
          owner,
          signer,
          goal,
          email,
          supervisorEmail,
          publicClient,
        } = await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await time.increase(deadline)

        const claimTxHash = await challenge.write.claimStake([BigInt(0)], {
          account: owner.account.address,
        })

        const claimTxReceipt = await publicClient.waitForTransactionReceipt({ hash: claimTxHash })

        const expiredEvent = claimTxReceipt.logs
          .map((log) => decodeEventLog({ abi: challenge.abi, data: log.data, topics: log.topics }))
          .find((parsedLog) => parsedLog?.eventName === 'Expired')

        expect(expiredEvent).to.not.be.undefined
        expect(expiredEvent?.args).to.deep.equal({
          owner: getAddress(signer.account.address),
          challengeId: BigInt(0),
          supervisor: getAddress(supervisor.account.address),
          goal,
          deadline,
          stake: challengeAmount,
        })
        /* await expect(challenge.write.claimStake([BigInt(0)], { account: owner.account.address }))
          .to.emit(challenge, "Expired")
          .withArgs(signer.account.address, BigInt(0), goal, deadline, owner.account.address, challengeAmount); */
      })
    })

    describe('getChallenge', function () {
      it('Should revert if challenge index does not exist', async function () {
        const { challenge } = await loadFixture(deployChallenge)

        await expect(challenge.read.getChallenge([BigInt(0)])).to.be.rejected
      })

      it('Should return valid challenge data', async function () {
        const { challenge, deadline, challengeAmount, supervisor, goal, owner, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: owner.account.address,
          value: challengeAmount,
        })

        const result = await challenge.read.getChallenge([BigInt(0)])
        expect(result).to.exist
      })
    })

    describe('getOwnerOfChallenge', function () {
      it('Should return empty address if challenge index doesnt exists', async function () {
        const { challenge } = await loadFixture(deployChallenge)

        const owner = await challenge.read.getOwnerOfChallenge([BigInt(0)])

        await expect(owner).to.be.eq('0x0000000000000000000000000000000000000000')
      })

      it('Should return owner of valid challenge', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        const ownerAddress = await challenge.read.getOwnerOfChallenge([BigInt(0)])
        expect(getAddress(ownerAddress)).to.equal(getAddress(signer.account.address))
      })
    })

    describe('getChallengesOfOwner', function () {
      it('Should return empty array for new owner', async function () {
        const { challenge, owner } = await loadFixture(deployChallenge)

        const challenges = await challenge.read.getChallengesOfOwner()
        expect(challenges.length).to.equal(0)
      })

      it('Should return challenges after creation', async function () {
        const { challenge, deadline, challengeAmount, supervisor, owner, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: owner.account.address,
          value: challengeAmount,
        })

        const challenges = await challenge.read.getChallengesOfOwner()
        expect(challenges.length).to.be.greaterThan(0)
      })
    })
  })

  describe('Withdraw Logic', function () {
    describe('confirmChallenge', function () {
      it('Should revert if non-supervisor tries to confirm', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await expect(
          challenge.write.confirmChallenge([BigInt(0)], { account: signer.account.address }),
        ).to.be.rejectedWith('Cannot confirm unauthorized challenges')
      })

      it('Should revert if challenge is expired', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await time.increase(deadline)

        await expect(
          challenge.write.confirmChallenge([BigInt(0)], { account: supervisor.account.address }),
        ).to.be.rejectedWith('Can only confirm challenges in-progress')
      })

      it('Should confirm challenge properly', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await expect(challenge.write.confirmChallenge([BigInt(0)], { account: supervisor.account.address })).to.be
          .fulfilled
      })
    })

    describe('withdrawStake', function () {
      it('Should revert if non-owner tries to withdraw', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, owner, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await expect(challenge.write.withdrawStake([BigInt(0)], { account: owner.account.address })).to.be.rejectedWith(
          "Must be the challenge's owner in order to withdraw the stake",
        )
      })

      it('Should revert if challenge not fulfilled', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await expect(
          challenge.write.withdrawStake([BigInt(0)], { account: signer.account.address }),
        ).to.be.rejectedWith('Cannot claim stake on unfulfilled challenges')
      })

      it('Should allow fulfilled challenge to withdraw', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await challenge.write.confirmChallenge([BigInt(0)], { account: supervisor.account.address })

        await expect(challenge.write.withdrawStake([BigInt(0)], { account: signer.account.address })).to.be.fulfilled
      })
    })

    describe('claimStake', function () {
      it('Should revert if challenge not expired', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, owner, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await expect(challenge.write.claimStake([BigInt(0)], { account: owner.account.address })).to.be.rejectedWith(
          'Challenge must have missed the deadline',
        )
      })

      it('Should revert if challenge confirmed', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, owner, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await challenge.write.confirmChallenge([BigInt(0)], { account: supervisor.account.address })

        await expect(challenge.write.claimStake([BigInt(0)], { account: owner.account.address })).to.be.rejectedWith(
          'Confirmed challenges cannot be claimed',
        )
      })

      it('Should allow claim after expiry', async function () {
        const { challenge, deadline, challengeAmount, supervisor, signer, goal, owner, email, supervisorEmail } =
          await loadFixture(deployChallenge)

        await challenge.write.createChallenge([goal, deadline, supervisor.account.address, email, supervisorEmail], {
          account: signer.account.address,
          value: challengeAmount,
        })

        await time.increase(deadline)

        await expect(challenge.write.claimStake([BigInt(0)], { account: owner.account.address })).to.be.fulfilled
      })
    })
  })

  describe('ChallengeAccessControl', function () {
    it('should have a valid initial serviceOwner address', async function () {
      const { challenge, owner } = await loadFixture(deployChallenge)

      const serviceOwner = await challenge.read.serviceOwner()

      expect(isAddress(serviceOwner)).to.be.true
      expect(serviceOwner).to.equal(getAddress(owner.account.address))
    })

    it('should allow the serviceOwner to set a new minimumStake', async function () {
      const { challenge, owner, publicClient } = await loadFixture(deployChallenge)
      const newStake = parseEther('1')

      const currentStake = await challenge.read.minimumStake()
      const txHash = await challenge.write.setMinimumStake([newStake], { account: owner.account.address })

      await publicClient.waitForTransactionReceipt({ hash: txHash })
      const updatedStake = await challenge.read.minimumStake()

      expect(currentStake).to.not.be.equal(updatedStake)
      expect(updatedStake).to.equal(newStake)
    })

    it('should revert if a non-serviceOwner tries to set minimumStake', async function () {
      const { challenge, signer } = await loadFixture(deployChallenge)
      const newStake = parseEther('1')

      await expect(challenge.write.setMinimumStake([newStake], { account: signer.account.address })).to.be.rejectedWith(
        'Only authorized owner permitted',
      )
    })

    it('should allow the serviceOwner to transfer ownership', async function () {
      const { challenge, supervisor, owner, publicClient } = await loadFixture(deployChallenge)
      const newOwner = getAddress(supervisor.account.address)

      const txHash = await challenge.write.transferOwnership([newOwner], { account: owner.account.address })

      await publicClient.waitForTransactionReceipt({ hash: txHash })

      const updatedOwner = await challenge.read.serviceOwner()

      expect(updatedOwner).to.equal(getAddress(newOwner))
    })

    it('should revert if trying to transfer ownership to address(0)', async function () {
      const { challenge, owner } = await loadFixture(deployChallenge)

      await expect(
        challenge.write.transferOwnership(['0x0000000000000000000000000000000000000000'], {
          account: owner.account.address,
        }),
      ).to.be.rejectedWith('New owner must not be null')
    })

    it('should revert if a non-serviceOwner tries to transfer ownership', async function () {
      const { challenge, supervisor } = await loadFixture(deployChallenge)
      const newOwner = supervisor.account.address

      await expect(
        challenge.write.transferOwnership([newOwner], { account: supervisor.account.address }),
      ).to.be.rejectedWith('Only authorized owner permitted')
    })
  })
})
