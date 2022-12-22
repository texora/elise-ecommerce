import * as React from 'react'

type Action = { type: 'addOrRemove'; id: number }
type Dispatch = (action: Action) => void
type State = { id: number }[]
type ContextValue = {
  state: State
  dispatch: Dispatch
}
// Create a context object with the createContext method and specify the type for the context value
const FavoriteContext = React.createContext<ContextValue | undefined>(undefined)

const favoriteReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addOrRemove': {
      let currentState = structuredClone(state)
      const findIndex = state.findIndex((e) => e.id === action.id)
      findIndex === -1 ? currentState.push({ id: action.id }) : currentState.splice(findIndex, 1)
      return currentState
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(favoriteReducer, [{ id: 0 }])
  const value = { state, dispatch }
  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}

export function useFavorite() {
  const context = React.useContext(FavoriteContext)
  if (context === undefined) {
    throw new Error('useFavorite must be used within a FavoriteProvider')
  }
  return context
}
