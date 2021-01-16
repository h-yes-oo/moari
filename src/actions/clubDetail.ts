export const ADD_MANAGER = 'ADD_MANAGER';
export const REMOVE_MANAGER = 'REMOVE_MANAGER';

interface AddManagerAction {
  type: typeof ADD_MANAGER
}

interface RemoveManagerAction {
  type: typeof REMOVE_MANAGER
}

export const addManager = (clubId: string): AddManagerAction => {  
  console.log('add manager action working');
  return {
    type: ADD_MANAGER,
  }
}

export const removeManager = (clubId: string, managerId: string): RemoveManagerAction => {  
  console.log('remove manager action working');
  return {
    type: REMOVE_MANAGER,
  }
}