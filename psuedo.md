# To DO

## Notes

- NavSearch
  - What the F is this, was this the old version of Search> 99% sure it can be deleted

-- Search Results don't clear when opening the modal again

## ReOrganize

- Refactor Homepage.jsx page with api calls moved to service folder and friends, room, and host data moved to some sort of context (Global or custom)
  - create services folder with server subfolder
    - Create file server.friends.api.js and server.room.api.js to handle api calls
  - update global context to get friends data in a callback function (or maybe just a normal function that gets api data anytime the variable is called?)
    - Create reducer that updates friends data
  - Maybe home page can update it's useEffect to listen to any changes to friends globalcontext
