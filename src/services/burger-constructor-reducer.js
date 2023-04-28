export const ingInitialState = [];

export function burgerConstructorReducer(state, action) {
    switch (action.type) {
        case 'add':
            let bun = state.find((x, idx) => x.type === 'bun');
            if (action.payload.type === 'bun' && bun) {
                if (action.payload._id !== bun._id) {
                    return [...state.filter(x => x.type !== 'bun'), action.payload]
                }
                return state;
            }
            return [...state, action.payload];
        case 'delete':
            return state.filter((_, idx) => idx !== action.payload);
        case 'deleteAll':
            return [];
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}