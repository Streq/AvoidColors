var Mocho = {
	structs: require("./mocho.structs")
}

class State{
	constructor(stack, appContext){
		/**@type StateStack */
		this.stack = stack;
		this.context = appContext;
	}
	requestStackPop(){
		this.stack.requestPop();
	}
	requestStackPush(stateID){
		this.stack.requestPush(stateID);
	}
	requestStackClear(){
		this.stack.requestClear();
	}
	
	handleEvent(event){}
	update(dt){}
	render(){}
}

class StateStack{
	constructor(){
		this.states = [];
		this.requests = new Mocho.structs.Queue();
		this.stateFactory = {};
		this.context = null;
	}
	requestPush(state){
		this.requests.enqueue(makeRequest(STACK_OPS.PUSH,state));
	}
	requestPop(){
		this.requests.enqueue(makeRequest(STACK_OPS.POP));
	}
	requestClear(){
		this.requests.enqueue(makeRequest(STACK_OPS.CLEAR));
	}

	processRequests(){
		var req;
		while(!this.requests.isEmpty()){
			req = this.requests.dequeue();
			switch(req.state){
				case STACK_OPS.PUSH:
					this.states.push(this.stateFactory[req.stateID](this));
					break;
				case STACK_OPS.POP:
					this.states.pop();
					break;
				case STACK_OPS.CLEAR:
					this.states.splice(0,this.states.length);
					break;
			}
		}
	}

	
	handleEvent(event){
		let i = this.states.length-1,
			states = this.states,
			continue_updating = true;
		for(i; i > -1; --i){
			continue_updating = states[i].handleEvent(event);
			if(!continue_updating){
				break;
			}
		}
	}
	update(dt){
		let i = this.states.length-1,
			states = this.states,
			continue_updating = true;
		for(i; i > -1; --i){
			continue_updating = states[i].update(dt);
			if(!continue_updating){
				break;
			}
		}
	}
	render(){
		this.states.forEach((each)=>{
			each.render();
		});
	}
	
}

const STACK_OPS = {
	PUSH : 0,
	POP: 1,
	CLEAR: 2
}
function makeRequest(stackop, stateID){
	return {
		stackop: stackop,
		state: stateID
	}
}

module.exports = {
	State:State,
	StateStack:StateStack
};