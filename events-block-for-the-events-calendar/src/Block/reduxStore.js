import {registerStore,dispatch} from "@wordpress/data";
import apiFetch from '@wordpress/api-fetch';


const actions = {
    populateTodo(todo){
        return {
            type:'POPULATE_TODO',
            todo
        }
    }
};
const reducer = (state=[],action) =>{
    switch (action.type){
        case 'POPULATE_TODO':
            if(action.todo == "zero"){
                return 'zero'
            }
            else if(action.todo !== "error"){
            return [...action.todo.events]
            }
            else{return 'error'}
        default:
            return state;
    }
}

const selectors={
    getTodos(state){
        return state;
    }
}
registerStore('ebec/events_data',{
    reducer,
    actions,
    selectors,
    resolvers:{
        getTodos(){
            apiFetch( { path: '/tribe/events/v1/events/?page=1&per_page=999&start_date=0000-01-01&end_date=9999-12-31' } ).then( ( events_data) => {
            
              if(events_data.events.length == 0){
                dispatch('ebec/events_data').populateTodo("zero");
               }
               else if(events_data.events){
                dispatch('ebec/events_data').populateTodo(events_data);
               }
               else{
                dispatch('ebec/events_data').populateTodo("error");
               }
        }).catch(function() {
            dispatch('ebec/events_data').populateTodo("error");
        })
        }
    }
})