const infoBarAction = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  CLOSE: 'close',
}
Object.freeze(infoBarAction);

function infoBarReducer(state, action) {
  switch (action.type) {
    case infoBarAction.CLOSE:
      return {
        ...state,
        open: false,
      };
    case infoBarAction.INFO:
      return {
        open: true,
        message: action.message,
        severity: infoBarAction.INFO,
      }
    case infoBarAction.SUCCESS:
      return {
        open: true,
        message: action.message,
        severity: infoBarAction.SUCCESS,
      }
    case infoBarAction.WARNING:
      return {
        open: true,
        message: action.message,
        severity: infoBarAction.WARNING,
      }
    case infoBarAction.ERROR:
      return {
        open: true,
        message: action.message,
        severity: infoBarAction.ERROR,
      }
    default:
      throw new Error('Showing infoBar is not enable with action: ' + action.type)
  }
}


const infoBarInitialState = {
  open: false,
  message: '',
  severity: 'success',
}

export {
  infoBarAction,
  infoBarReducer,
  infoBarInitialState,
}