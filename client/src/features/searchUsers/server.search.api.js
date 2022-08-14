const newSearchDB = async (searchQuery) => {
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

export {newSearchDB};