$(document).ready(function () {

        alert(
            "click the character you want to be, then click the one you want to fight, then click ATTACK button to ATTACK!!!! Note- every time you attack, enemy damage goes up even more"
        );
        //to take place of character selected
        var hero;
        var opponent;
        //counters for # of attacks and wins
        var attackClicks = 0;
        var wins = 0;
        // objects
        var characters = {
            jay: {
                healthPoints: 120,
                attackPower: 8,
                counterAttackPower: 8,
                name: "jay"
            },
            mark: {
                healthPoints: 180,
                attackPower: 6,
                counterAttackPower: 6,
                name: "mark"
            },
            puffin: {
                healthPoints: 80,
                attackPower: 2,
                counterAttackPower: 2,
                name: "puffin"
            },
            bob: {
                healthPoints: 220,
                attackPower: 7,
                counterAttackPower: 7,
                name: "bob"
            },
            dude: {
                healthPoints: 200,
                attackPower: 6,
                counterAttackPower: 6,
                name: "dude"
            }
        };

        thisCharacterName = $(".img").attr("data-name");
        thisCharacter = characters[thisCharacterName];
        $(".jaycontain").append("<h4>Health "+characters.jay.healthPoints+"</h4>");
        $(".markcontain").append("<h4>Health "+characters.mark.healthPoints+"</h4>");
        $(".puffincontain").append("<h4>Health "+characters.puffin.healthPoints+"</h4>");
        $(".bobcontain").append("<h4>Health "+characters.bob.healthPoints+"</h4>");
        $(".dudecontain").append("<h4>Health "+characters.dude.healthPoints+"</h4>");


        

        $("#button-1").on("click", function () {
            if (opponent == null) {
                $("h1").text("Choose someone already");
            } else {
                attackClicks += 1;
                var compoundedAttack = hero.attackPower * attackClicks;
                hero.healthPoints = hero.healthPoints - opponent.counterAttackPower;
                opponent.healthPoints = opponent.healthPoints - compoundedAttack;
                // added .text on h4 specific divs for healthpoints 
                $(".chosen h4").text("Health "+hero.healthPoints);
                $(".enemydisplay h4").text("Health "+opponent.healthPoints);
                $(".instructions").empty().append(hero.name+" has inflicted "+compoundedAttack+" damage points and "+opponent.name+" has inflicted "+opponent.counterAttackPower+" damage points.").css("font-size", "32px").css("font-weight", "bold");
                
                //Checks for game winning after clicking attack
                //Opponent Defeated
                if (opponent.healthPoints <= 0) {
                    $(".enemydisplay h4").remove();
                    $(".enemy").remove();
                    $(".versus").empty();
                    $(".versus").append("<h2>You beat: "+opponent.name+"</h2>");
                    $("body").css("background-color", "#8b0000");
                    wins += 1;
                    opponent = null;
                }
                //
                if (wins === 4) {
                    alert("you have beat the game, amazing!");
                    location.reload();
                }
                if (hero.healthPoints <= 0) {
                    alert("the game has you beat, your skills are not good (and/or you picked puffin)");
                    location.reload();
                }
            }
        });
        // Any image that has not been clicked yet
        $(".img").on("click", function () {
            if (hero == null) {
                var thisCharacterName = $(this).attr("data-name");
                var thisCharacter = characters[thisCharacterName];
                hero = thisCharacter;
                console.log(hero);
                $(this).addClass("chosenimg");
                $(this).parent().detach().appendTo(".chosen");
                $(".chosen h4").text("Health "+hero.healthPoints).css("background-color", "blue");
                $(this).off("click");
                // console.log("you chose " + $(this).attr("data-name"));
                $(".versus").append("<h2>"+$(this).attr("data-name")+"</h2");

            } 
            
            else if (opponent == null) {
                var secondCharacterName = $(this).attr("data-name");
                var secondCharacter = characters[secondCharacterName];
                opponent = secondCharacter;
                console.log(opponent);
                $(this).addClass("enemy");
                $(".versus").empty();
                $(this).parent().detach().appendTo(".enemydisplay");
                $(".enemydisplay h4").text("Health "+opponent.healthPoints).css("background-color", "blue");
                $(".versus").append("<h2>"+hero.name+"</h2");
                $(".versus").append("versus");
                $(this).off("click");
                // console.log ("you chose " + $(this).attr("data-name"));
                $(".versus").append("<h2>"+$(this).attr("data-name")+"</h2>");
                $("body").css("background-color", "blue");
                $("h1").empty().append("jayQuery R-P//uffin-G");
                $(".instructions").empty().css("font-weight", "").css("font-size", "").append("Pick a character, and choose wisely Young Game Consumer-Padawan");

            }
        
            else {
                alert("the arena is full");
            }
            
        });
    });