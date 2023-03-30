import { RoomType } from "../../types/RoomType";


export const toggleSamplingOfRoom = (rooms : RoomType[], setRooms : (a: RoomType[]) => void,  roomUuid? : number) : boolean => {

    const currentRoom = rooms.find(room => room.uuid === roomUuid);
    const roomsWithoutCurrent = rooms.filter(room => room.uuid !== roomUuid);

    if (currentRoom) {


        const updatedRoom = {
            ...currentRoom,
            sampling: !currentRoom.sampling
        }

        const updatedRooms = [...roomsWithoutCurrent, updatedRoom].sort((a, b) => a.uuid - b.uuid);

        setRooms(updatedRooms);
        return true;
    }


    return false;

}