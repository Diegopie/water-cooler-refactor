const searchDB = async (searchQuery) => {
    try{
        const response = await fetch('/api/user/search', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({search: searchQuery}),
            method: 'POST'
        });

        const data = await response.json();

        if (!data.success) {
            return false;
        }
        return(data.query);

    } catch (err) {
        console.log({ err });
    }
};

const sendFriendRequest = async (id, userId) => {
    try {
        const request = await fetch('/api/friends/request', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friend: id, user: userId }),
            method: 'PUT'
        });
        const status = await request.json();
       
        if (!status.success) {
            console.log('server err');
        }
        
    } catch (err) {
        console.log({ err });
    }
};

export {searchDB, sendFriendRequest};