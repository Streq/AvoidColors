"use strict";
//Logic
class Menu {
    constructor(options){
        options = options || {};
        this.title = options.title || "";
        this.buttons = options.buttons || [];
        this.index = -1;
    }
    press(){
        if(this.index > -1){
            this.buttons[this.index].press();
        }
    }
    release(){
        this.buttons[this.index].release();
    }
    focus(index){
        this.buttons.forEach((element,index) => {
            if(this.index != index){
                element.blur();
            }
        });
        
        if(index > -1 && index < this.buttons.length && this.buttons[index].is_selectable){
            this.buttons[index].focus();
            this.index = index;
        }else{
            this.index = -1
        };
    }
}
class Button {
    constructor(options){
        options = options || {};
        this.text = options.text || "";
        
        this.onpress = options.onpress || (x=>x);
        this.onrelease = options.onpress || (x=>x);
        this.onchange = options.oncheck || (x=>x);

        this.focused = options.focused || false;
        this.pressed = options.pressed || false;
        this.ischeck = options.toggled || false;
        
        this.is_selectable = options.is_selectable || true;
        this.is_checkbox = options.is_selectable || true;
    }
    press(){
        if(this.is_toggle){
            this.toggle();
        }
        if(!this.pressed){
            this.pressed = true;
            this.onpress();
        }
    }
    release(){
        if(this.pressed){
            this.pressed = false;
            this.onrelease();
        }
    }
    blur(){
        if(this.focused){
            this.focused = false;
            this.pressed = false;
        }
    }
    focus(){
        this.focused = true;
    }

    toggle(flag){
        if(flag != this.toggled){
            this.toggled = !this.toggled;
            this.onchange(this.toggled);
        }
    }
}

//Rendering
class MenuRenderer{
    constructor(){}
    renderMenu(menu){

    }
}
