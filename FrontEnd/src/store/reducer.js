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
    if(action.type === "HotelPage"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.hotelItem = action.hotelItem;
        return newState;
    }
    if(action.type === "changeCity"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveInfo.city = action.city;
        return newState;
    }
    if(action.type === "changeTime"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveInfo.startTime = action.startTime;
        newState.reserveInfo.endTime = action.endTime;
        return newState;
    }
    if(action.type === "changePeople"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveInfo.numberOfPeople = action.numberOfPeople;
        return newState;
    }
    if(action.type === "changeSourceCity"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveTicketInfo.sourceCity = action.sourceCity;
        return newState;
    }
    if(action.type === "changeDestinationCity"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveTicketInfo.destinationCity = action.destinationCity;
        return newState;
    }
    if(action.type === "changeTravelTime"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveTicketInfo.travelTime = action.travelTime;
        return newState;
    }
    if(action.type === "changeTransportType"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveTicketInfo.transportType = action.transportType;
        return newState;
    }
    if(action.type === "transportPage"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.reserveTicketInfo.transportItem = action.transportItem;
        return newState;
    }
    if(action.type === "changeHomePageBar"){
        const newState = JSON.parse(JSON.stringify(state));
        newState.homePageKey = action.key;
        return newState;
    }
    return state;
}
