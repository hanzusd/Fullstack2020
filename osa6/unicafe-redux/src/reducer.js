const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  state = {...state}
  switch (action.type) {
    case 'GOOD':
      state.good = state.good + 1
      return state
    case 'OK':
      state.ok = state.ok + 1
      return state
    case 'BAD':
      state.bad = state.bad + 1
      return state
    case 'ZERO':
      state.good = 0
      state.ok = 0
      state.bad = 0
      return state
    default: return state
  }
  
}

export default counterReducer