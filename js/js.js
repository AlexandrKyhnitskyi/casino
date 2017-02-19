$(document).ready(function(){

    var started = false;
    var Double = false;
    var Playing_cards_values={
        2: {
            address:'two.jpg',
            value:2
                },
        3: {
            address:'three.jpg',
            value:3
             },
        4: {
            address:'four.jpg',
            value:4
             },
        5: {
            address:'five.jpg',
            value:5
             },
        6: {
            address:'six.jpg',
            value:6
            },
        7: {
            address:'seven.jpg',
            value:7
            },
        8: {
            address:'eight.jpg',
            value:8
            },
        9: {
            address:'nine.jpg',
            value:9
            },
        10: {
            address:'ten.jpg',
            value:10
            },
        'В': {
            address:'jack.jpg',
            value:10
            },
        'Д': {
            address:'dame.jpg',
            value:10
            },
        'К': {
            address:'king.jpg',
            value:10
            },
        'Т': {
            address:'ace.jpg',
            value:11
            }
    };

    var Playing_cards=Object.keys(Playing_cards_values);
    console.log(Playing_cards);
    var Playing_cards_icon=['bubno.jpg','chirv.jpg','hrest.jpg','pico.jpg'];
    var chart=$(".game1").html();
    var i=0;
    var j=0;
    $('.game1').remove();


 //   The function of clearing the gaming table when the player seemed
    function clear(){
        $(".player>h2").text(0);
        $('.info').text('Зробіть свою ставку');
        $('.info').show();
        $('.card').remove();
        $('.after').hide();
        $(".info-player").text("");
        $(".info-duler").text("");
        i=0;
        j=0;
    }

//The function of the sample random number
    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// Function is responsible for player funds rate
    $(".chips").click(function(){
        if (!started) {
            var chips=Number($(this).text());
            var res=Number($(".count>h1").eq(1).text());
            if( res<chips){
                alert("У вас не вистачає коштів!!!");
            }
            else {
                 var last_ante=Number($(".player>h2").text());
                 var ante=last_ante+chips;

                $('.info').hide();
                if (ante>0) {
                    $('.before').show();
                }
                if(ante<=2000 ){
                    $(".player>h2").text(ante);
                    $(".count>h1").eq(1).text(res-chips);
                }
               else
                alert("Ви намагаєтесь перевищити розмір максимальної ставки");
                }
        }
    })

// Function that gives the player two and cards one card  computer
    function cardsToplayer(){
        started = true;
        addCardPlayer();
         addCardPlayer ();
         addCardComp();
        valid();
        $('.game').show();
        $('.duler').show();
        $('.before').hide();
        $('.after').show();
}
//  Function for matching card player
    function addCardPlayer(){
       $(".game").append(chart);
        var bloc=$(".game>.card");

        var random_card=Playing_cards[getRandomInRange(0,12)];
        var random_suit=Playing_cards_icon[getRandomInRange(0,3)];

        bloc.eq(i).find('h4').each(function(){
            $(this).text(random_card);
        });

        bloc.eq(i).find('.image-card').each(function(){
            $(this).attr("src","img/"+random_suit);
        });

        $(".game>.card>#img-card").eq(i).attr("src","img/"+Playing_cards_values[random_card]['address']);

             if(i>0){
         var s=bloc.eq(i-1).css('margin-left');
                  console.log(s);
        var marg=Number(s.substring(0,3));
         bloc.eq(i).css({
             'margin-left':marg+Number(30),
             'z-index': 100+i
         });
            countPoints();
        }
        if(Number($(".info-player").text())>21){
            $('.info').show();
            $('.info').text("Ви програли!!!");
            started=false;
            setTimeout(clear,4000);
        }
        i++;
    }

// Function for matching card computer
    function addCardComp(){
        $(".duler").append(chart);
        var bloc=$(".duler>.card");

        var random_card=Playing_cards[getRandomInRange(0,12)];
        var random_suit=Playing_cards_icon[getRandomInRange(0,3)];

        bloc.eq(j).find('h4').each(function(){
            $(this).text(random_card);
        });

        bloc.eq(j).find('.image-card').each(function(){
            $(this).attr("src","img/"+random_suit);
        });
        $(".duler>.card>#img-card").eq(j).attr("src","img/"+Playing_cards_values[random_card]['address']);

        if(j>0){
            var s=bloc.eq(j-1).css('margin-left');
            var marg=Number(s.substring(0,3));
            bloc.eq(j).css({
                'margin-left':marg+Number(30),
                'margin-top': '40px'
            });
        }
            else{
            bloc.eq(j).css({ 'margin-top': '40px'});
        }
        countPointsComp();
        j++;
    }

//Function that cancels player's bet
    function cancelRate(){
    var ante=Number($(".player>h2").text());
    var rahunok=Number($(".count>h1").eq(1).text());
    $(".count>h1").eq(1).text(rahunok+ante);
    $(".before").hide();
        
}
//Function that allows you double bet
    function doubleRate(){
        if(!Double){
                var ante=Number($(".player>h2").text())*2;
                if(ante<=2000){
                    var res=Number($(".count>h1").eq(1).text());
                    $(".player>h2").text(ante);
                    $(".count>h1").eq(1).text(res-ante/2);
                }
               else
                alert("Ви намагаєтесь перевищити розмір максимальної ставки");

        }
    }
//Function - seem
    function playerGaveUp(){
        var res=Number($(".count>h1").eq(1).text());
        var gave_up=Number($(".player>h2").text())/2+res;
        $(".count>h1").eq(1).text(gave_up);
        started=true;

}

//Counting function points player
    function countPoints(){
        var count=0;
        var tcount = 0;
        $(".game>.card>.info-card>.top").each(function () {
            var val = $.trim($(this).text());
            if (val === 'Т') {
                tcount++;
            }
            count += Playing_cards_values[val]['value'];
        });
        while (count > 21 && tcount > 0) {
            count -= 10;
            tcount--;
        }
        $(".info-player").text(count);
    }
//Counting function points computer
    function countPointsComp(){
        var count=0;
        var tcount = 0;
        $(".duler>.card>.info-card>.top").each(function () {
            var val = $.trim($(this).text());
            if (val === 'Т') {
                tcount++;
            }
            count += Playing_cards_values[val]['value'];
        });
        while (count > 21 && tcount > 0) {
            count -= 10;
            tcount--;
        }
                $(".info-duler").text(count);

        }

//The function does not check your player won beforehand
    function valid(){
        var res=Number($(".count>h1").eq(1).text());
        var ante=Number($(".player>h2").text());
        if(Number($(".info-player").text())==21){
            $('.info').show();
            $('.info').text("Ви виграли!!!");
            $(".count>h1").eq(1).text(res+ante*2);
            started=false;
            setTimeout(clear, 3000);

        }
        else if(Number($(".info-player").text())>21){
            $('.info').show();
            $('.info').text("Ви програли!!!");
            $(".count>h1").eq(1).text(res-ante);
            started=false;
        }
    }
    //   Function announces winner
    function stop(){
        while(Number($(".info-duler").text())<17){
            addCardComp();
            countPointsComp();
        }
        var res=Number($(".count>h1").eq(1).text());
        var ante=Number($(".player>h2").text());
        $('.info').show();

        if(Number($(".info-duler").text())<Number($(".info-player").text()) || Number($(".info-duler").text())>21) {
            $('.info').text("Ви виграли!!!");
            $(".count>h1").eq(1).text(res+ante*2);

        }
        if(Number($(".info-duler").text())>Number($(".info-player").text()) && Number($(".info-duler").text())<=21 ){
            $(".count>h1").eq(1).text(res-ante);
            $('.info').text("Ви програли!!!");
        }
        if(Number($(".info-duler").text())==Number($(".info-player").text())){
            $(".count>h1").eq(1).text(res+ante);
            $('.info').text("Нічия");
        }
        setTimeout(clear, 3000);
    }



//Play!!!
 //    Distributing the first card players
    $(".action").click(function() {
       cardsToplayer();
    })
//  Cancels bet player
   $(".cancel").click(function(){
        cancelRate();
        clear();
    })
//Double bet
    $(".opt").eq(0).click(function(){
        doubleRate();
        Double=true;

      })

//Seem
 $(".opt").eq(1).click(function(){
        playerGaveUp();
        clear();
        started=false;
    })
 //  Adds the player card
    $(".opt").eq(2).click(function(){
        addCardPlayer();
    })
    //Stop )))
    $(".opt").eq(3).click(function(){
         stop();
        started=false;
        Double=false;
    })
})
