const defaultState = {
    user:0,
    UserName:"default",
    hotelItem:{},
    roomItem:{},
    homePageKey:null,
    reserveInfo:{
        city:null,
        startTime:null,
        endTime:null,
        numberOfPeople:null
    },
    reserveTicketInfo:{
        sourceCity:null,
        destinationCity:null,
        travelTime:null,
        transportType:null
    },
    transportItem:{}
}
export default (state = defaultState, action) => {
    if(action.type === "user"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.user = action.user;
        newState.UserName = action.UserName;
        return newState;
    }
    if(action.type === "RoomPage"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.roomItem = action.roomItem;
        return newState;
    }
    return state;
}
