const initialState = {
    list: '',
    name: '',
    age: 0
}

const GET_AGE = 'GET_AGE'
const GET_LIST = 'GET_LIST'
const GET_NAME = 'GET_NAME'

export function getList(list) {
    return {
        type: GET_LIST,
        payload: list
    }
}

export function getName(name) {
    return {
        type: GET_NAME,
        payload: name
    }
}

export function getAge(age) {
    return {
        type: GET_AGE,
        payload: age
    }
}


export default function (state = initialState, action) {
    console.log(action.payload)
    switch (action.type) {
        case GET_AGE:
            return {
                ...state, getAge: action.payload
            }
        case GET_NAME:
            return {
                ...state, name: action.payload
            }
        case GET_LIST:
            return {
                ...state, getList: action.payload
            }
            default: return state
    }
}