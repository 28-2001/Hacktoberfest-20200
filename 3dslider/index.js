$(document).ready(function() {
    var categorySld = new swiperobin();
    categorySld.init();
});


var swiperobin = function(container, basecardCls, itemCls, cardHeight, cardWidth) {
    if(typeof container === 'undefined')
    {
        container = $(".container-fluid");
        basecardCls = "basecard";
        itemCls = "mycard";
        cardHeight = 206;
        cardWidth = 150;
    }
    this.data = {
        container: container,
        itemsContainer: container.find($('.'+basecardCls)),
        containerWidth: 0,
        containerHeight: 0,
        items: container.find($('.'+itemCls)),
        totalItems: 0,
        calculations: [],
        calculationsCopyDistance: [],
        orientation: [],
        maxDistance: 0,
        cordstart: 0,
        cordend: 0,
        preview: 0,
        touchflag: 0,
    };
    this.data.totalItems = this.data.items.length;
    
    this.defaults = {
        startingItem: 0,
        seperation: 0, //in percentage
        sizeMultiplier: 0.8,
        opacityInitial: 1,
        opacityDifference: 0.1,
        perspective: 3000, //in pixels
        flankingItems: 3,

        //animation defaults
        speed: 700,
        animationEasing: 'linear',
        quickerForFurther: true,
        orientation: 'horizontal',
        activeClassName: 'active',
        forcedImageWidth: cardWidth,
        forcedImageHeight: cardHeight,
    };
};

swiperobin.prototype.init = function() {
    this.setOriginalItemDimensions();
    this.preCalculatePositionProperties();
    this.setupRobin();
    this.HandleClicks();
    this.HandleDrag();
    this.reSize();
};

swiperobin.prototype.setOriginalItemDimensions = function() {

    this.data.items.each(function() {
        if ($(this).attr('original_width') == undefined) {
            $(this).attr('original_width', $(this).width());
        }
        if ($(this).attr('original_height') == undefined) {
            $(this).attr('original_height', $(this).height());
        }
    });
    if (this.defaults.forcedImageWidth && this.defaults.forcedImageHeight) {
        this.data.itemsContainer
            .width(this.defaults.forcedImageWidth)
            .height(this.defaults.forcedImageHeight);
    }

};

swiperobin.prototype.preCalculatePositionProperties = function() {
    // The 0 index is the center item in the carousel
    var Item = this.data.itemsContainer;
    var midpoint = $(window).width() / 2;
    Item.css({
        'margin': 'auto',
        'display': 'block',
        'position': 'relative',
        'perspective': this.defaults.perspective + 'px'
    });

    this.data.calculations = [{
        distance: 0,
        opacity: 1,
        scale: 1,
        zindex: 0,
        cover: midpoint
    }];
    
    $(this.data.items[0]).attr("data-index", 0);
    this.data.orientation = [0];

    var flankdisplaycount = (this.defaults.flankingItems * 2);
    var opacity = this.defaults.opacityInitial;
    var scale = 1;
    var seperation = this.defaults.seperation;
    var cover = seperation / 2;
    var j = 1;
    var calcDistance = 0;
    if ((flankdisplaycount + 1) > this.data.totalItems) {
        this.defaults.flankingItems = parseInt((this.data.totalItems - 1)/2);
    }
    flankdisplaycount = (this.defaults.flankingItems * 2);


    for (var i = 1; i <= flankdisplaycount; i++, j = parseInt((i + 1) / 2)) {
        if (i % 2 == 1) {
            opacity -= this.defaults.opacityDifference;
            scale *= this.defaults.sizeMultiplier;
            seperation += (75 / j);
            cover = ((this.defaults.forcedImageWidth / 2) + (this.defaults.forcedImageWidth * seperation / 100) - (((1 - scale) / 2) * this.defaults.forcedImageWidth));

            this.data.calculations.push({
                distance: seperation + '%',
                opacity: opacity,
                scale: scale,
                zindex: -j,
                cover: (midpoint + cover),
            });
            this.data.orientation.push(i);
        } else {

            this.data.calculations.unshift({
                distance: -seperation + '%',
                opacity: opacity,
                scale: scale,
                zindex: -j,
                cover: (midpoint - cover),
            });
            this.data.orientation.unshift(i);
        }

        $(this.data.items[i]).attr("data-index", i);
    }
    for (var i = flankdisplaycount + 1; i < this.data.totalItems; i++) {
        if (i % 2 == 1) {
            this.data.calculations.push({
                distance: 0,
                opacity: 0,
                scale: 0,
                zindex: -this.data.totalItems,
                cover: 0,
            });
            this.data.orientation.push(i);
        } else {
            this.data.calculations.unshift({
                distance: 0,
                opacity: 0,
                scale: 0,
                zindex: -this.data.totalItems,
                cover: 0
            });
            this.data.orientation.unshift(i);
        }
        $(this.data.items[i]).attr("data-index", i);
    }

    for(var i = 0 ; i<this.data.totalItems;i++)
    {
        this.data.calculationsCopyDistance[i] = this.data.calculations[i].distance;
        //console.log(this.data.calculations[i].distance, this.data.calculationsCopyDistance[i]);
    }
    var middle = parseInt((this.data.calculations.length - 1) / 2);
    var mmax = middle + this.defaults.flankingItems;
    this.data.maxDistance = this.defaults.forcedImageWidth + (((this.defaults.forcedImageWidth * parseInt(this.data.calculations[mmax].distance) / 100) - (((1 - this.data.calculations[mmax].scale) / 2) * this.defaults.forcedImageWidth)) * 2);
    console.log("flank"+this.defaults.flankingItems);
};

swiperobin.prototype.setupRobin = function(subsequent) {
    var i = 0;
    if (typeof subsequent === 'undefined') {
        this.data.items.each(function() {
            $(this).css({
                left: 0
            });
        });
    }
    for (var i = 0; i < this.data.totalItems; i++) {
        $(this.data.items[this.data.orientation[i]]).removeClass("active");
        if(this.data.calculations[i].distance == 0)
        {
            $(this.data.items[this.data.orientation[i]]).addClass("active");
        }
        
        $(this.data.items[this.data.orientation[i]]).transition({
            position: 'absolute',
            height: 'inherit',
            width: 'inherit',
            left: this.data.calculations[i].distance,
            scale: this.data.calculations[i].scale,
            zIndex: this.data.calculations[i].zindex,
            opacity: this.data.calculations[i].opacity,
        }, this.defaults.speed);
    }    
};

swiperobin.prototype.HandleClicks = function() {
    //console.log(this.data.orientation);
    this.data.items.unbind().bind("click", this, function(e) {
        var myPosition = $(this).attr("data-index");
        var myIndex = -1;
        var obj = e.data;
        console.log("click");
        for (var i = 0; i < obj.data.totalItems; i++) {
            if (myPosition == obj.data.orientation[i]) {
                myIndex = i;
                console.log("ind:" +myIndex);
                break;
            }
        }
        if (myIndex >= 0) {
            var left = [];
            var right = [];
            var halfLength = parseInt((obj.data.totalItems - 1) / 2);
            if (myIndex > halfLength) {
                left = obj.data.orientation.slice(myIndex - halfLength);
                right = obj.data.orientation.slice(0, myIndex - halfLength);
            } else {
                left = obj.data.orientation.slice(obj.data.totalItems - halfLength + myIndex);
                right = obj.data.orientation.slice(0, obj.data.totalItems - halfLength + myIndex);
            }
            obj.data.orientation = left.concat(right);
            //console.log(obj.data.orientation);
            obj.setupRobin(true);
        }
    });
};


swiperobin.prototype.HandleDrag = function() {
    var obj = this.data;
    for (var i = 0; i < this.data.totalItems; i++) {
        this.data.items[i].addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("text/plain", "hi");
            obj.cordstart = e.clientX;

        }, false);
        this.data.items[i].addEventListener("mousemove", function(e) {
            obj.cordend = e.clientX;

        }, false);
        this.data.items[i].addEventListener("dragend", function(e) {
            if (obj.cordstart > obj.cordend) {
                console.log('left swipe');
            } else {
                console.log('right swipe');
            }

        });
        this.data.items[i].addEventListener("touchstart", function(e) {
            

            obj.cordstart = e.touches[0].clientX;
            obj.cordend = e.touches[0].clientX;
            //console.log('touch start');
        });
        this.data.items[i].addEventListener("touchmove", function(e) {
            obj.cordend = e.touches[0].clientX;
        });
        this.data.items[i].addEventListener("touchend", function(e) {
            console.log("touchend");
            //console.log(obj.cordstart,obj.cordend);
            var myIndext = -1;
            if (obj.cordend > (obj.cordstart - 20) && obj.cordend < (obj.cordstart + 20))
            {  
                this.HandleClicks();
            }
            else if (obj.cordend > (obj.cordstart + 75)){
                e.preventDefault();
                myIndext = parseInt((obj.totalItems - 1) / 2)-1;
            }
            else if (obj.cordend < (obj.cordstart - 75)){
                e.preventDefault();
                 myIndext = parseInt((obj.totalItems - 1) / 2)+1;
                console.log(obj.cordend,obj.cordstart);
            }
            else {}
            if (myIndext >= 0){
                var left = [];
                var right = [];
            var halfLength = parseInt((obj.totalItems - 1) / 2);
            if (myIndext > halfLength) {
                left = obj.orientation.slice(myIndext - halfLength);
                right = obj.orientation.slice(0, myIndext - halfLength);
            }else {
                left = obj.orientation.slice(obj.totalItems - halfLength + myIndext);
                right = obj.orientation.slice(0, obj.totalItems - halfLength + myIndext);
            }
            obj.orientation = left.concat(right);
            //console.log(obj.orientation);
            this.setupRobin(true);
        }
        }.bind(this));
    }
};


swiperobin.prototype.reSize = function() {

    var flag = false;
    var obj = this;
    var cardw = this.defaults.forcedImageWidth/2;
    var maxObj = this.data.maxDistance;
    var maxRef = this.data.maxDistance;
    var middle = parseInt((this.data.calculations.length - 1) / 2);
    var flank = this.defaults.flankingItems;

    $.fn.resizeEnd = function(callback, timeout) {
        $(window).resize(function() {
            if (flag == false) {
                flag = true;
                console.log(middle);

            }
            if ($(this).data('scrollTimeout')) {
                clearTimeout($(this).data('scrollTimeout'));
            }
            $(this).data('scrollTimeout', setTimeout(callback, timeout));
        });
    };
    // how to call it (with a 1000ms timeout):
    $(window).resizeEnd(function() {
        if ($(this).width() < maxObj) {
            var diff = maxObj - $(this).width();
            var percent = (diff / 1.5);
            for (var i = middle - flank, j = (-20*flank); i <= middle + flank; i++, j +=20) {
                if (i < middle)
                {
                    if(parseInt(obj.data.calculations[i].distance)+percent > -10+j )
                        obj.data.calculations[i].distance = -10+j + "%";
                    else
                    obj.data.calculations[i].distance = (parseInt(obj.data.calculations[i].distance) + percent) + "%";
                }
                if (i > middle){
                    if(parseInt(obj.data.calculations[i].distance)-percent < 10+j )
                        obj.data.calculations[i].distance = 10+j + "%";
                    else
                    obj.data.calculations[i].distance = (parseInt(obj.data.calculations[i].distance) - percent) + "%";
                }
            }
            obj.setupRobin(true);
        } else if ($(this).width() > maxObj) {
            var diff = $(this).width() - maxObj;
            var percent = (diff / 1.5);
           for (var i = middle - flank; i <= middle + flank; i++) {
                if (i < middle)
                {
                    if(parseInt(obj.data.calculations[i].distance)-percent < parseInt(obj.data.calculationsCopyDistance[i])) 
                        obj.data.calculations[i].distance = obj.data.calculationsCopyDistance[i];
                    else
                    obj.data.calculations[i].distance = (parseInt(obj.data.calculations[i].distance) - percent) + "%";
                }
                if (i > middle){
                    if(parseInt(obj.data.calculations[i].distance)+percent > parseInt(obj.data.calculationsCopyDistance[i]))
                        obj.data.calculations[i].distance = obj.data.calculationsCopyDistance[i];
                    else
                    obj.data.calculations[i].distance = (parseInt(obj.data.calculations[i].distance) + percent) + "%";
                }
            }
            obj.setupRobin(true);
        } else {
            console.log('hello');
        }
        flag = false;

    }, 400);
};