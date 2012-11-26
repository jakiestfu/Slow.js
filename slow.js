/* 
 * Slow.js
 * Copyright Jacob Kelley
 * MIT License
 */

var slow = slow || (function(d) {

    var cache = {
            elements: {},
            prop: false
        },
        defaults = {
            keyCode: 16, // Shift
            multiplier: 2
        },
        slowExtend = function(dest, source){
            var property;
            for (property in source){
                if(source[property]){
                    dest[property] = source[property];
                }
            }
            return dest;
        };
    
    String.prototype.trim=function(){
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
	
    // Determines whether or not there is a transition on the specified element
    function getStyle(el) {
        
        if(typeof el=="object"){
	        // We only need to check this once
	        if(cache.prop===false){
	            var prefixes = 'webkit Moz o ms'.split(' '), i;
	            for(i in prefixes){
	                if(typeof d.body.style[prefixes[i]+'TransitionDuration'] != 'undefined'){
                        cache.prop = prefixes[i]+'TransitionDuration';
	                    break;
	                }
	            }
	        }
	        
	        // Return a numerical value of the transition duration
	        var styles = d.defaultView.getComputedStyle(el, null);
	        if (styles && typeof styles[cache.prop]!='undefined' && styles[cache.prop]!='0s'){
                var durations = (styles[cache.prop]).split(','), j;
                for(j=0; j<durations.length; j++){
                    if(durations[j].trim()!='0s'){
                        durations[j] = Math.round((parseFloat((durations[j].trim()).replace(/[a-z]+/g, '')))*Math.pow(10,3))/Math.pow(10,3);
                    } else {
                        delete durations[j];
                    }
                }
                return durations;
	        }
        }
    }

    // Loops through the documents elements searching for ones with transition property
    function targetElements() {
        if(cache.elements.length>0){
            return cache.elements;
        } else {
            var all = d.body.getElementsByTagName("*"),
                good = [],
                i;
            for (i in all) {
                if(all[i]){
                    var cur = all[i],
                        duration = getStyle(cur);
                    if (duration !== false && typeof duration != 'undefined') {
                        good.push([cur, duration]);
                    }
                }
            }
            cache.elements = good;
            
            return good;
        }
    }

    // Update the elements transitionDuration depending on whether or not the target key is pressed
    function applySpeed(isKeyDown, multiplier){
        var els = targetElements(),
            i,j;
            
        for(i in els){
            if(typeof els[i][0] != 'undefined'){
                var newSpeed = [];
                for(j=0; j<els[i][1].length; j++){
                    if(typeof els[i][1][j]!='undefined'){
                        if(isKeyDown){
		                    newSpeed.push((els[i][1][j]*multiplier)+'s');
		                } else {
		                    newSpeed.push((els[i][1][j])+'s');
		                }
	                }
                }
                els[i][0].style[cache.prop]=newSpeed.join(',');
            }
        }
    }
    
    // Listen for our key events
    function doListen(userOpts, killListeners) {
        var opts = slowExtend(defaults, userOpts),
			eventFunc = function(e){
				if (e.which == opts.keyCode) {
	                applySpeed(e.type=="keydown", opts.multiplier);
	            }
			};
		d.addEventListener('keydown', eventFunc);
		d.addEventListener('keyup', eventFunc);
    }
    
    return {
        listen: doListen
    };

})(document);