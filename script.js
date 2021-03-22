$(document).ready(function(){
    let next = "https://pokeapi.co/api/v2/pokemon/";
    getCharacters()
    $('.btn__more').click(function(e){
        e.preventDefault();
        $("#info").html("");
        getCharacters();
    });

    function  getCharacters(){
        $.ajax({
            url: next,
            context: document.body,
            method: 'GET',
            success: function(response){ 
                console.log(response)
                next = response.next
                response.results.forEach(function(info){
                    let details = `<div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${info.name}</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" url="${info.url}" class="btn btn-primary">¡Quiero ver más de este pokémon!</a>
                    </div>
                  </div> `

                  $('#info').append(details)
                  
                })
            }, 
            complete: function(){
                $('.btn-primary').click(function(e){
                    e.preventDefault();
                    $('#myModal').modal('show') 
                    let new_url = ($(this).attr('url'));
                    $.ajax({
                        url: new_url,
                        context: document.body,
                        method: 'GET',
                        success: function(response){
                            $('#namePokemon').append(response.species.name)
                            $("#namePokemon").append("<img src='"+response.sprites.front_default+"'></img>")
                            $("#namePokemon").append("<img src='"+response.sprites.front_shiny+"'></img>")
                            response.abilities.forEach(function(abi){
                                $("#abilityPokemon").append("<p>"+abi.ability.name+"</p>")
                            })
                            response.types.forEach(function(tipo){
                                $("#typePokemon").append("<p>"+tipo.type.name+"</p>")
                            })

                            response.moves.forEach(function(move, index){
                                if (index < 5) {
                                    $("#movePokemon").append("<p>"+move.move.name+"</p>")
                                }
                            
                            })

                            response.game_indices.forEach(function(gen){
                                $("#generationPokemon").append("<p>"+gen.version.name+"</p>")
                            })
                        }
                    })
                    $('[data-dismiss="modal"]').click(function(){
                        $("#namePokemon").html("");
                        $("#abilityPokemon").html("");
                        $("#typePokemon").html("");
                        $("#movePokemon").html("");
                        $("#generationPokemon").html("");
                    })
                })
            }
        }).done(function() {
            $( this ).addClass( "done" );
        });
    
    }
    
})