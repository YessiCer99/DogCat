//<!-- Script de carrusel del modo responsivo -->

var current = 0;
var imagenes = new Array();


 
$(document).ready(function() {

  localStorage.setItem("valorBotonVolver","gato");
  
  
  
    var numImages = 6;
    if (numImages <= 2) {
        $('.right-arrow').css('display', 'none');
        $('.left-arrow').css('display', 'none');
    }
 
    $('.left-arrow').on('click',function() {
        if (current > 0) {
            current = current - 1;
        } else {
            current = numImages - 2;
        }
 
        $(".carrusel").animate({"left": -($('#product_'+current).position().left)}, 600);
 
        return false;
    });
 
    $('.left-arrow').on('hover', function() {
        $(this).css('opacity','0.5');
    }, function() {
        $(this).css('opacity','1');
    });
 
    $('.right-arrow').on('hover', function() {
        $(this).css('opacity','0.5');
    }, function() {
        $(this).css('opacity','1');
    });
 
    $('.right-arrow').on('click', function() {
        if (numImages > current + 2) {
            current = current+1;
        } else {
            current = 0;
        }
 
        $(".carrusel").animate({"left": -($('#product_'+current).position().left)}, 600);
 
        return false;
    }); 

    //<!-- fin del script de carrusel del modo responsivo -->


        console.log("A partir de aqui empiezo");

            //Los datos son enviados a develop/php/selectCatalogo.php para ser procesados 
    $.post('php/selectCatalogo.php',{
        raza:"gato"
    },function(data){
        //Aqui se obtiene la respuesta 
        var insertRespuesta = JSON.parse(data);
        if (insertRespuesta!=null) {
            let divCont = document.getElementById("divContainer");
            let divCar = document.getElementById("divCarrusel");
            //Si se obtuvieron los datos correctos serán mostrados en pantalla
            if (insertRespuesta.response == "SUCCESS") {
              console.log("SUCCESS");
              var contador = 0;
              let detail = insertRespuesta.detail;
              detail.forEach(row1 => {
                divCont.innerHTML += `
   
                  
                  <div class="product-item" category="">
                  <img src=${row1.foto} alt="">
                  <h2 class="nombre_mascota" >${row1.nombre}</h2>
                  <div class="buscador_category" style="text-align:center; margin:20px;">
                  <button class="button_adopcion2" onclick="conocerMascota7(${row1.id});">CONOCEME</button>
                  <button class="button_adopcion3" onclick="btnSolicitarAdopcion7(${row1.id});">ADOPTAME</button>
                  </div>
                  </div>
                
                `;

                divCar.innerHTML += `


                <div class="product-item" id="product_${contador}" category="">
                  <img src=${row1.foto} width="195" height="100" alt="">
                  <h2 class="nombre_mascota" >${row1.nombre}</h2>
                  <div class="buscador_category2" style="text-align:center;">
                    <button class="button_adopcion2" onclick="conocerMascota7(${row1.id});">CONOCEME</button>
                    <button class="button_adopcion3" onclick="btnSolicitarAdopcion7(${row1.id});">ADOPTAME</button>
                  </div>
                </div>
                
                `;
                contador = contador+1;
              });
            } else {
              alert('Ha ocurrido un error, intetelo mas tarde');
            }
        }else{
            alert('Ha ocurrido un error, intetelo mas tarde');
            window.location= 'index.php';
        }


        
    });


     });

     function conocerMascota7(id) {
      console.log(id);
      localStorage.setItem("idMascotaDescription",id);
      console.log(localStorage.getItem("idMascotaDescription"));
      window.location= 'Description.html'; 
    }

    function btnSolicitarAdopcion7(idA) {
      console.log("funcion adoptar");
      localStorage.setItem("idMascotaForSolicitarAdopcion",idA);
      console.log(localStorage.getItem("idMascotaForSolicitarAdopcion"));
      window.location= 'adoptar.html'; 
    }


    function btnbusqueda999(){
      console.log('buscar');
      let sex = $('input[name="sexo"]:checked').val();
      let nom = document.getElementById('nombrebusqueda9').value;
      let tll = document.getElementById('tallabusqueda9').value;
      console.log(sex);
      console.log(nom);
      console.log(tll);

      $.post('php/selectMascotaBusqueda.php',{
                    nombre:nom,
                    sexo:sex,
                    talla:tll,
                    raza:"gato"
                },function(data6){
                    if (data6!=null) {
                        var insertRespuesta6 = JSON.parse(data6);
                        console.log(insertRespuesta6);
                        let divCont9 = document.getElementById("divContainer");
                        let divCar9 = document.getElementById("divCarrusel");
                        divCont9.innerHTML = "";
                        divCar9.innerHTML = "";
 
                        if (insertRespuesta6.response == "SUCCESS") {
                            var contador3 = 0;
                            let detail6 = insertRespuesta6.detail;
                            detail6.forEach(row6 => {


                              divCont9.innerHTML += `
   
                  
                                <div class="product-item" category="">
                                <img src=${row6.foto} alt="">
                                <h2 class="nombre_mascota" >${row6.nombre}</h2>
                                <div class="buscador_category" style="text-align:center; margin:20px;">
                                <button class="button_adopcion2" onclick="conocerMascota7(${row6.id});">CONOCEME</button>
                                <button class="button_adopcion3" onclick="btnSolicitarAdopcion7(${row6.id});">ADOPTAME</button>
                                </div>
                                </div>
                              
                              `;

                              divCar9.innerHTML += `


                              <div class="product-item" id="product_${contador3}" category="">
                                <img src=${row6.foto} width="195" height="100" alt="">
                                <h2 class="nombre_mascota" >${row6.nombre}</h2>
                                <div class="buscador_category2" style="text-align:center;">
                                  <button class="button_adopcion2" onclick="conocerMascota7(${row6.id});">CONOCEME</button>
                                  <button class="button_adopcion3" onclick="btnSolicitarAdopcion7(${row6.id});">ADOPTAME</button>
                                </div>
                              </div>
                              
                              `;



                              contador3 = contador3+1;                               


                            });
                        }


                    }else{
                      console.log("sin resultados");
                    }
                });
                
    }


function btncancelar999() {
  window.location.reload();
}


function volver999() {
    window.location= 'index.html';

}

