export const initialState = {
    user: null,
    basket: [],
    desc: null,
    search: '',
    currency: '',
    dark: false
}

//to get the total from the basket
export const getBasketTotal = (basket) => {
    let total = 0
    // eslint-disable-next-line
    basket.map(elem => {
        total = total + elem.price
    })

    return total
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.search
            }
        case 'SET_DARK':
            return {
                ...state,
                search: action.search
            }
        case 'SET_CURRENCY':
            return {
                ...state,
                currency: action.currency
            }
        case 'SET_DESC':
            return {
                ...state,
                desc: action.desc
            }
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'REMOVE_FROM_BASKET':
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id)
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.ward('no item with such id exists in cart')
            }
            return {
                ...state,
                basket: newBasket
            }
        default:
            return state
    }
}

export default reducer