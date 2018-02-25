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




        //$(".imgc").append("<h4>Health: "+thisCharacter.healthPoints+"</h4>");
        // $(".markcontain").append("<h4>Health "+characters.mark.healthPoints+"</h4>");

        

        $("#button-1").on("click", function () {
            if (opponent == null) {
                alert("You can't fight noone...can you?")
            } else {
                attackClicks += 1;
                hero.healthPoints = hero.healthPoints - opponent.counterAttackPower;
                opponent.healthPoints = opponent.healthPoints - hero.attackPower * attackClicks;
                // added .text on h4 specific divs for healthpoints 
                $(".chosen h4").text("Health "+hero.healthPoints);
                $(".enemydisplay h4").text("Health "+opponent.healthPoints);
                console.log("your " + hero.name + " has " + hero.healthPoints + " and " + opponent.name + " has " + opponent.healthPoints);
                //Checks for game winning after clicking attack
                //Opponent Defeated
                if (opponent.healthPoints <= 0) {
                    $(".enemydisplay h4").remove();
                    $(".enemy").remove();
                    $(".versus").empty();
                    alert("you beat " + opponent.name);
                    wins += 1;
                    opponent = null;
                }
                //
                if (wins === 4) {
                    alert("you have beat the game, amazing!");
                    location.reload();
                }
                if (hero.healthPoints <= 0) {
                    alert("the game has beat you, your skills are not that amazing");
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
                alert("you chose " + $(this).attr("data-name"));
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
                $('<p>VERSUS</p>').appendTo(".versus");
                $(this).off("click");
                alert("you chose " + $(this).attr("data-name"));
            }
        
            else {
                alert("the arena is full");
            }
            
        });
    });