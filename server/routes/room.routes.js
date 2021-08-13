const db = require('../models');
const router = require('express').Router();
const { Room, User } = require('../models');
const { dbArray } = require('../controllers/user-arrays');

// populates rooms page with public rooms
router
    .route('/')

    .get((req, res) => {
        Room
            .find({})
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// Accept a Room Invite
router
    .route('/accept')
    .put(async ({ body }, res) => {
        try {
            // ** Access User's db and Pull publicRoomID From 'inboundPendingRooms' Array
            const pullRoomFromUser = dbArray.pull(
                'inboundPendingRooms',
                body.user,
                body.pubRoomId
            );

            if (!pullRoomFromUser) {
                res.json({ success: false });
            }

            await db.Room
                .findOneAndUpdate(
                    { publicRoomId: body.pubRoomId },
                    {
                        $addToSet:
                            { roomUsers: body.user }
                    },
                    { new: true }

                );

            res.json({ success: true });

        } catch (err) {
            console.log(err);
        }
    });

// creates room
router
    .route('/create')
    .post((req, res) => {
        Room
            .create({
                roomName: req.body.roomName,
                roomUsers: [req.body.userId],
                roomDesc: req.body.roomDescription,
                publicRoomId: req.body.publicRoomId,
                roomCreator: req.body.userId,
                roomImg: req.body.roomImg
            })
            .then(data => {
                if (req.body.roomFriends.length <= 0) {
                    console.log('does this fix it?');
                    res.json({ success: true, data });
                    return;
                }
                for (let i = 0; i < req.body.roomFriends.length; i++) {
                    User
                        .findByIdAndUpdate(
                            { _id: req.body.roomFriends[i] },
                            { $addToSet: { inboundPendingRooms: data.publicRoomId } }
                        )
                        .then(update => {
                            return update;
                        })
                        .catch(err => {
                            return err;
                        });
                }
                dbArray.set('activeRoom', req.body.userId, data._id.toString());
                res.json({ success: true, data });
                return;
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// Decline Room Invite
router
    .route('/decline')
    .put(async ({ body }, res) => {
        // ** Access User's db and Pull publicRoomID From 'inboundPendingRooms' Array
        const pullID = dbArray.pull('inboundPendingRooms', body.user, body.pubRoomId);
        if (!pullID) {
            res.json({ success: false });
        }
        res.json({ success: true });
    });

// End a Room
router
    .route('/end')
    .delete(async ({ body }, res) => {
        const deleteRoom = await db.Room
            .findOneAndDelete(
                { publicRoomId: body.pubRoomId }
            );
        if (!deleteRoom) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true });
    });

// gathers rooms based on id
router
    .route('/find')
    .post((req, res) => {
        Room
            .findOne({ _id: req.body.id })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// gathers rooms based on public id
router
    .route('/findpublic')
    .post((req, res) => {
        Room
            .findOne({ publicRoomId: req.body.id })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

router
    .route('/findmany')
    .post(({ body }, res) => {
        Room
            .find({ _id: { $in: body.ids } })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// Leave a Room
router
    .route('/leave')
    .put(async ({ body }, res) => {
        const pullIDFromRoom = await db.Room
            .findOneAndUpdate(
                { publicRoomId: body.pubRoomId },
                {
                    $pull:
                        { roomUsers: body.user }
                },
                { new: true }
            );
        if (!pullIDFromRoom) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true });
    });

// * Get Information of the Users in a Room
router
    .route('/users')
    .post(async ({ body }, res) => {
        try {
            // * Get DB Info for All IDs in idArray
            const roomUsers = await db.User.find({ _id: { $in: body.users } });
         
            // ** If no friends found, End Function
            if (!roomUsers) {
                console.log('No users found');
                res.json({ success: false });
                return;
            }
            // * Store Data To Send Back To Client
            const response = [];

            // * Loop Through Results to Store Relevant Data in an Object
            roomUsers.forEach(friends => {
                let userParsed = {
                    username: friends.username,
                    firstName: friends.firstName,
                    lastName: friends.lastName,
                    imageSrc: friends.imageSrc,
                    friendId: friends._id,
                    status: friends.status
                };
                
                // *** Push Each Result to response
                response.push(userParsed);
            });

            // ** Send Filtered Response to Client
            res.json({ success: true, retUsers: response });
        } catch (err) {
            console.log('/api/room/users: ', err);
        }
    });

// gathers rooms based on publicRoomId
router
    .route('/:id')
    .post((req, res) => {
        Room
            .findOne({ publicRoomId: req.body.publicRoomId })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });



module.exports = router;