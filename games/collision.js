collision = function(bound, compare){
    var boundArray = bound;
    var compareArray = compare;

    if(compareArray.length){
        
        for(i=0; i<boundArray.length; i++){
            boundOffset = $(boundArray[i]).offset();
            boundOffset.right = boundOffset.left + $(boundArray[i]).width();
            boundOffset.bottom = boundOffset.top + $(boundArray[i]).height();
            
            for(j=0; j<compareArray.length; j++){
                comparePosition = $(compareArray[j]).offset();
                comparePosition.right = comparePosition.left + $(compareArray[i]).width();
                comparePosition.bottom = comparePosition.top + $(compareArray[i]).height();
              
                if(comparePosition.bottom > boundOffset.top &&
                   comparePosition.top < boundOffset.bottom){
                    if(comparePosition.right > boundOffset.left &&
                        comparePosition.left < boundOffset.left){
                        return boundArray[i];                    
                    }
                }
            }
        }
    }
}