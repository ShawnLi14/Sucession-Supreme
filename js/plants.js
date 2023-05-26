var nutrients = 10000;
var soilLevel = 99;
var phase = 0;
var firTrees = 0;
var difficulty = 0;

function updateSoil() {
    if(soilLevel < 100){
        $('.primary-succession-animation').css('animation', `colorChange 100s`);
        $('.primary-succession-animation').css('animation-delay', `-${soilLevel}s`);
        $('.primary-succession-animation').css('animation-play-state', 'paused');
    }
    else{
        if(phase == 0){
            secondPhase();
        }
        if(phase == 1 && nutrients >= 20000 && difficulty == 0){
            thirdPhaseEasy();
        }
        $('.primary-succession-animation').css('animation-delay', `-95s`);
    }
}

function winChecker(){
    if(firTrees >= 20 && phase == 2){
        winEasy();
    }
}

setInterval(winChecker, 100);
setInterval(updateSoil, 100);
setInterval(drought, 5000);
  
function plant(id, img, perSecond, length, cost) {
    if(nutrients < cost){
        alert("Not enough nutrients!");
        return;
    }
    else{
        nutrients -= cost;
        updateNutrients();
    }
    var seconds = 0;
    plantImage(id, img);
    $('#' + id).attr('data-content', length - seconds + 's left');
    var interval = setInterval(function() {
        if (seconds >= length || $('#' + id).hasClass('disabled-grid')) {
            clearInterval(interval);
            removePlant(id);
        } else {
            nutrients += perSecond;
            soilLevel += 1;
            updateNutrients();
            seconds++;
            $('#' + id).attr('data-content', length - seconds + 's left');
        }
    }, 1000);
}

function updateNutrients(){
    $('#nutrientsValue').html(nutrients);
    $('#soilLevel').html(Math.min(100, soilLevel) + '%');
}
function plantImage(id, img){
    plantedBoxes.add(id);
    $('#popup-container').hide();
    $('#' + id).html('<img src="images/plantable/' + img + '.png" width="100" height="100">');
}
function removePlant(id){
    plantedBoxes.delete(id);
    $('#' + id).attr('data-content', "Plantable");
    $('#' + id).html('');
    $('#' + id).removeClass('animate');
}
$(document).ready(function() {
    updateNutrients();
});

function secondPhase(){
    phase = 1;
    $('#goal').html('Reach 20000 nutrients');
    $('body').addClass('phase-2-bg');
    $('.level-animation-overlay').css('opacity', '1');
    $('.next-level').css('animation-play-state', 'running');
    $('.level-animation-overlay').css('z-index', '9999');
    document.getElementById('rain-button').style.visibility = 'visible';
    setTimeout(function() {
        $('.level-animation-overlay').css('opacity', '0');
        $('.level-animation-overlay').css('z-index', '-1');
    }, 3000);
}

function activateRain(){
    if(nutrients < 1000){
        alert("Not enough nutrients!");
        return;
    }
    $('#rain-button').css('visibility', 'hidden');
    nutrients -= 1000;
    updateNutrients();

    var $overlay = $('#raindrop-overlay');
    var $cloud = $('#cloud');
    var $raindropsContainer = $('#raindrops-container');
  
    $overlay.css('display', 'block');
    createRaindrops();
    animateCloud();
  
    setTimeout(function() {
        openBoxes.add(5);
        openBoxes.add(9);
        $('#5').removeClass('disabled-grid');
        $('#9').removeClass('disabled-grid');
    }, 1500);
    setTimeout(function() {
        openBoxes.add(8);
        openBoxes.add(12);
        $('#8').removeClass('disabled-grid');
        $('#12').removeClass('disabled-grid');
    }, 3000);
    function animateCloud() {
      $cloud.css('animation', 'cloud-move 5s linear forwards');
    }
  
    $cloud.on('animationend', function() {
      $overlay.css('display', 'none');
      $cloud.css('animation', 'none');
    });
  
    function createRaindrops() {
      var numRaindrops = 30;
  
      for (var i = 0; i < numRaindrops; i++) {
        var $raindrop = $('<div class="raindrop"></div>');
        $raindrop.css('left', (Math.random() * $cloud.outerWidth() * 0.8 + $cloud.outerWidth() * 0.2) + 'px');
        $raindrop.css('animation-delay', Math.random() * 3000 + 'ms');
        $raindropsContainer.append($raindrop);
      }
    }
}

function thirdPhaseEasy(){
    phase = 2;
    $('#goal').html('Plant 20 Fir Trees');
    $('#next-level-text').html('Shrub Phase Complete!');
    $('body').addClass('phase-3-bg');
    $('.next-level').css('animation-play-state', 'running');
    $('.level-animation-overlay').css('opacity', '1');
    $('.level-animation-overlay').css('z-index', '9999');
    const animation = document.querySelector('.next-level');
    animation.classList.add('reset-animation');
    void animation.offsetWidth;
    animation.classList.remove('reset-animation');
    document.getElementById('river-button').style.visibility = 'visible';
    setTimeout(function() {
        $('.level-animation-overlay').css('opacity', '0');
        $('.level-animation-overlay').css('z-index', '-1');
    }, 3000);
}

function winEasy(){
    stopTimer();
    phase = 3;
    $('#next-level-text').html('Climax Community Created! You Win! <br> Time: ' + padTime(hours) + ":" + padTime(hours) + ":" + padTime(hours));
    $('.level-animation-overlay').css('opacity', '1');
    $('.next-level').css('animation-play-state', 'running');
    $('.level-animation-overlay').css('z-index', '9999');
    $('.next-level').css('animation-iteration-count', '1');
    const animation = document.querySelector('.next-level');
    animation.classList.add('reset-animation');
    void animation.offsetWidth;
    animation.classList.remove('reset-animation');
}

function activateRiver(){
    if(nutrients < 50000){
        alert("Not enough nutrients!");
        return;
    }
    $('#river-button').css('visibility', 'hidden');
    nutrients -= 50000;
    updateNutrients();

    var riverAnimation = document.getElementById('river-animation-one');
    riverAnimation.innerHTML = '<div class="river"></div>';
    var riverAnimation = document.getElementById('river-animation-two');
    riverAnimation.innerHTML = '<div class="river"></div>';

    setTimeout(function() {
        openBoxes.add(1);
        openBoxes.add(13);
        $('#1').removeClass('disabled-grid');
        $('#13').removeClass('disabled-grid');
    }, 1750);
    setTimeout(function() {
        openBoxes.add(2);
        openBoxes.add(14);
        $('#2').removeClass('disabled-grid');
        $('#14').removeClass('disabled-grid');
    }, 2500);
    setTimeout(function() {
        openBoxes.add(3);
        openBoxes.add(15);
        $('#3').removeClass('disabled-grid');
        $('#15').removeClass('disabled-grid');
    }, 3000);
    setTimeout(function() {
        openBoxes.add(4);
        openBoxes.add(16);
        $('#4').removeClass('disabled-grid');
        $('#16').removeClass('disabled-grid');
    }, 3500);
}

function drought(){
    openBoxes.forEach(elem => {
        $('#' + elem).removeClass('disabled-grid');
    });

    var randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber > 10 || phase == 0) {
        return;
    }

    var numElementsToSelect = Math.ceil(openBoxes.size / 4);
    
    var selectedElements = [];
    openBoxes.forEach(elem => {
        if(Math.random() * 100 < 20){
            selectedElements.push(elem);
        }
    });

    for(var i = 0; i < selectedElements.length; i++){
        $('#' + selectedElements[i]).removeClass('primary-succession-animation');
        $('#' + selectedElements[i]).removeClass('grid-item');
        $('#' + selectedElements[i]).css('animation', 'none');
        $('#' + selectedElements[i]).addClass('disabled-grid');
        $('#' + selectedElements[i]).addClass('grid-item');
        
    }

    $('#next-level-text').html('Drought');
    $('.next-level').css('animation-play-state', 'running');
    $('.level-animation-overlay').css('opacity', '1');
    $('.level-animation-overlay').css('z-index', '9999');
    const animation = document.querySelector('.next-level');
    animation.classList.add('reset-animation');
    void animation.offsetWidth;
    animation.classList.remove('reset-animation');
    $('.next-level').css('animation-delay', '-1.5s');
    setTimeout(function() {
        $('.level-animation-overlay').css('opacity', '0');
        $('.level-animation-overlay').css('z-index', '-1');
    }, 1500);
    $('#next-level-text').css('color', '#C2B280');
}