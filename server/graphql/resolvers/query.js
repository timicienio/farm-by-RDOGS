const Farm = require('../../models/Farm');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server');

module.exports = {
	Query: {
		async getFarms() {
			try {
				const farms = await Farm.find().sort({ createdAt: -1 });
				return farms;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getFarm(_, { farmId }) {
			console.log(farmId);
			try {
				const farm = await Farm.findById(farmId);
				if (farm) {
					return farm;
				} else {
					throw new Error('Farm not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async getUserData(_, { userId }) {
			try {
				const user = await User.findById(userId);
				if (!user) {
					throw new UserInputError('User not found');
				}
				return {
					...user._doc,
					id: user._id,
				};
			} catch (err) {
				throw new Error(err);
			}
		},
		async getFriendList(_, { userId })
		{
			try {
				const user = await User.findById(userId);
				if (!user) {
					throw new UserInputError('User not found');
				}
				return user.friends;
			}catch(err)
			{
				throw new Error(err)
			}
		},
		async getInvitationList(_, { userId })
		{
			try {
				const user = await User.findById(userId);
				if (!user) {
					throw new UserInputError('User not found');
				}
				return user.invitations;
			}catch(err)
			{
				throw new Error(err)
			}
		}
	},
};
