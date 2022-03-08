
// Used in Firebase.js in putDMNewRoom()
// Used in components/Main.js in handleDMAdd()
export const formatNewDMName = (alters) => {
  let newRoomName = ''
  if (alters.length == 1) {
    newRoomName = `${alters[0].name}'s Private Journal`
  } else {
    for (alter of alters) {
      if (newRoomName == '') {
        newRoomName = alter.name
      } else {
        newRoomName = newRoomName + ', ' + alter.name
      }
    }
  }
  return newRoomName
}