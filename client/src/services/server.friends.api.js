const getFriendsData = async (_id, arr) => {
    try {
        // * Make Request For IDs Stored In A Users Mongo Document
        const response = await fetch('/api/friends/arrays', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: _id, case: arr }),
            method: 'POST'
        });

        const data = await response.json();

        return data;

    } catch (err) {
        console.log(err);
    }
};

export { getFriendsData };