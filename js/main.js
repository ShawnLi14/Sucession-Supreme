let plantedBoxes = new Set();
var lastBoxID = 0;

$(document).ready(function() {
    $('.grid-item').on('click', function() {
        var boxNumber = parseInt($(this).attr('id'));
        if (!plantedBoxes.has(boxNumber)) {
            lastBoxID = boxNumber;
            showPopup($(this), boxNumber);
        }
    });
    function showPopup($box, boxNumber) {
        var $popupContainer = $('#popup-container');
        var $popup = $('<div class="popup">' + addShopItems() + '</div>');

        // Position the pop-up box
        var boxOffset = $box.offset();
        var popupLeft = boxOffset.left + $box.outerWidth() + 10;
        var popupTop = boxOffset.top - $popup.outerHeight() - 10;
        $popup.css({ left: popupLeft, top: popupTop });

        // Append the pop-up box to the container
        $popupContainer.html($popup);

        // Show the pop-up box
        $popupContainer.show();

        $('.shop-item').on('click', function() {
            var id = $(this).attr('id');
            if(id == "Lichen"){
                plant(lastBoxID, id.toLowerCase(), 10, 15, 100);
            }
            if(id == "Grass"){
                plant(lastBoxID, id.toLowerCase(), 50, 6, 200);
            }
            if(id == "Beans"){
                plant(lastBoxID, id.toLowerCase(), 100, 15, 1000);
            }
            if(id == "Shrub"){
                plant(lastBoxID, id.toLowerCase(), 700, 10, 5000);   
            }
            if(id == "Hydrangea"){
                plant(lastBoxID, id.toLowerCase(), 750, 20, 10000);   
            }
            if(id == "Pin Cherry"){
                plant(lastBoxID, id.toLowerCase(), 6000, 7, 30000);
            }
            if(id == "Spruce"){
                plant(lastBoxID, id.toLowerCase(), 5000, 15, 50000);
            }
            if(id == "Pine"){
                plant(lastBoxID, id.toLowerCase(), 15000, 10, 100000);
            }
            if(id == "Fir"){
                plant(lastBoxID, id.toLowerCase(), 20000, 15, 200000);
                firTrees++;
            }
        });
    }

    // Close the pop-up box when clicking outside of it
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.popup').length && !$(e.target).closest('.grid-item:not(.disabled-grid)').length) {
            $('#popup-container').hide();
        }
    });
});

function addShopItems(){
    var lichen = createShopItem("Lichen", 100, "images/plantable/lichen.png");
    var str = lichen;
    if(phase > 0){
        var grass = createShopItem("Grass", 200, "images/plantable/grass.png");
        var beans = createShopItem("Beans", 1000, "images/plantable/beans.png");
        var shrub = createShopItem("Shrub", 5000, "images/plantable/shrub.png");
        var hydrangea = createShopItem("Hydrangea", 10000, "images/plantable/hydrangea.png");
        str += grass + beans + shrub + hydrangea;
    }
    if(phase > 1){
        var pin_cherry = createShopItem("Pin Cherry", 30000, "images/plantable/pin cherry.png");
        var spruce = createShopItem("Spruce", 50000, "images/plantable/spruce.png");
        var pine = createShopItem("Pine", 100000, "images/plantable/pine.png");
        var fir = createShopItem("Fir", 200000, "images/plantable/fir.png");
        str += pin_cherry + spruce + pine + fir;
    }
    return str;
}

function createShopItem(name, cost, png){
    return '<div class="shop-item" id="' + name + '"><img src="' + png + '" alt="Label" class="label-img"><div class="item-name">' + name + '</div><div class="item-cost">' + cost + ' Nutrients</div></div>';
}

function startGame(diff){
    $('body').removeClass('body-title');
    difficulty = diff;
    $('#game').show();
    $('#difficultySelect').hide();
    $('body').addClass('body-game');
}

function difficultyScreen(){
    $('#mainMenu').hide();
    $('#difficultySelect').show();
}