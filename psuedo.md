# To DO

## Notes

- NavSearch
  - What the F is this, was this the old version of Search> 99% sure it can be deleted

-- Search Results don't clear when opening the modal again

- API
  - friends.routes line 90 added returnedUsers response and will phase out retUsers in the response

## ReOrganize

- Create Fiends Context get friends data in a callback function (or maybe just a normal function that gets api data anytime the variable is called?)
  - Create reducer that updates friends data
  - This grabs raw data then any component that needs to can organize it as needed (TabNav just needs all friend data, homepage needs the active room within it)
- Refactor Homepage.jsx page with api calls moved to service folder and friends, room, and host data moved to some sort of context (Global or custom)
  - create services folder with server subfolder
    - Create file server.friends.api.js and server.room.api.js to handle api calls
 
  - Maybe home page can update it's useEffect to listen to any changes to friends FriendContext
