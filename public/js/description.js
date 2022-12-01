// <!-- Script de carrusel del modo responsivo -->

var current = 0;
var imagenes = new Array();
 
$(document).ready(function() {
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

            //Los datos son enviados a develop/php/selectCatalogo.php para ser procesados 

            $.post('php/selectMascotaDescription.php',{
        id:localStorage.getItem("idMascotaDescription")
    },function(data){
        //Aqui se obtiene la respuesta 
        var insertRespuesta = JSON.parse(data);
        if (insertRespuesta!=null) {
            //Si se obtuvieron los datos correctos serán mostrados en pantalla
            if (insertRespuesta.response == "SUCCESS") {
              console.log("SUCCESS");
              let divCont = document.getElementById("divContenedor");
              let divCont2 = document.getElementById("divCont2");
              let detail = insertRespuesta.detail;
              detail.forEach(row1 => {
                console.log(row1);
                divCont.innerHTML = `
                
                <div class="foto-adopcion">
                        <img src=${row1.foto} alt="" >
                    </div>
                    
                                    <!-- seccion de descripcion de la mascota -->

                        <section class="detalles-animal">
                            <div class="detalle-animales" category="">
                            <ul style="margin-top:0px ;">
                                <div class="detalle-animal">
                                <li class="description-mascota">Nombre: </li><h5 class="datos">${row1.nombre}</h5> </div>
                                <div class="detalle-animal"> <li class="description-mascota">Color:</li><h5 class="datos">${row1.color}</h5> </div>
                                <div class="detalle-animal"> <li class="description-mascota">Sexo:</li><h5 class="datos">${row1.sexo}</h5>  </div>
                                <div class="detalle-animal"><li class="description-mascota">Esterilizada(o):</li><h5 class="datos">${row1.esterilizado}</h5></div> 
                                <div class="detalle-animal"><li class="description-mascota">Talla:</li><h5 class="datos">${row1.talla}</h5> </div>
                                <div class="detalle-animal"><li class="description-mascota">Edad:</li><h5 class="datos">${row1.edad+" años"}</h5> </div>
                            </ul>
                            </div>
                        </section>
                        
                        <section class="detalles-animal">
                            <div class="detalle-animales" category="">
                            <ul style="margin-top:0px ;">

                                <div class="detalle-animal"><li class="description-mascota">DESCRIPCIÓN GENERAL </li> </div>
                            </ul>

                            <div class="buscador_category" style="text-align:center; margin:20px;">
                                <button class="button_adopcion2" style="background-color: #FF0000;" onclick="btnSolicitarAdopcion7(${row1.id});">ADOPTAR AHORA</button></div>
                            </div>
                        </section>
                    </div>
                
                
                `;



                divCont2.innerHTML = `
                
                <section class="detalles-animal">
                    <div class="detalle-animales" category="">
                        <ul style="margin-top:0px ;    padding-left: 0px;">
                            <div class="detalle-animal">
                            <li class="description-mascota">Nombre: </li><h5 class="datos">${row1.nombre}</h5> </div>
                            <div class="detalle-animal"> <li class="description-mascota">Color:</li><h5 class="datos">${row1.color}</h5> </div>
                            <div class="detalle-animal"> <li class="description-mascota">Sexo:</li><h5 class="datos">${row1.sexo}</h5>  </div>
                            <div class="detalle-animal"><li class="description-mascota">Esterilizada(o):</li><h5 class="datos">${row1.esterilizado}</h5></div> 
                            <div class="detalle-animal"><li class="description-mascota">Talla:</li><h5 class="datos">${row1.talla}</h5> </div>
                            <div class="detalle-animal"><li class="description-mascota">Edad:</li><h5 class="datos">${row1.edad+" años"}</h5> </div>
                        </ul>
                    </div>
                </section>
                <section class="detalles-animal">
                    <div class="detalle-animales" category="">
                        <ul style="margin-top:0px ;">

                            <div class="detalle-animal"><li class="description-mascota">DESCRIPCIÓN GENERAL </li> </div>
                        </ul>

                        <div class="buscador_category" style="text-align:center; margin:20px;">
                            <button class="button_adopcion2" style="background-color: #FF0000;" onclick="btnSolicitarAdopcion7(${row1.id});">ADOPTAR AHORA</button></div>
                    </div>
                </section>                
                
                
                `;

                $.post('php/selectMascotaBusqueda.php',{
                    nombre:row1.nombre,
                    sexo:row1.sexo,
                    talla:row1.talla,
                    raza:row1.raza
                },function(data2){
                    if (data2!=null) {
                        //Aqui se obtiene la respuesta 
                        var insertRespuesta2 = JSON.parse(data2);
                        if (insertRespuesta2.response == "SUCCESS") {
                            var contador2 = 0;
                            let secCont4 = document.getElementById("sec4");
                            let car44 = document.getElementById('car444');
                            let detail2 = insertRespuesta2.detail;
                            detail2.forEach(row3 => {
                                if(row3.id != row1.id){

                                    secCont4.innerHTML += `
                                
                                    <div class="product-item" category="">
                                        <img src=${row3.foto} alt="">
                                        <h2 class="nombre_mascota" > ${row3.nombre}</h2>
                                        <div class="buscador_category" style="text-align:center; margin:20px;">
                                        <button class="button_adopcion2" onclick="conocerMascota7(${row3.id});">CONOCEME</button>
                                        <button class="button_adopcion3" onclick="btnSolicitarAdopcion7(${row3.id});">ADOPTAME</button>
                                        </div>
                                    </div>
                                    
                                    `;


                                    car44.innerHTML += `
                                    
                                    <div class="product-item" id="product_${contador2}" category="">
                                        <img src=${row3.foto} width="195" height="100" alt="">
                                        <h2 class="nombre_mascota" > ${row3.nombre}</h2>
                                        <div class="buscador_category2" style="text-align:center;">
                                            <button class="button_adopcion2" onclick="conocerMascota7(${row3.id});">CONOCEME</button>
                                            <button class="button_adopcion3" onclick="btnSolicitarAdopcion7(${row3.id});">ADOPTAME</button>
                                        </div>
                                    </div>
                                    
                                    `;
                                    
                                    contador2 = contador2 + 1;

                                }


                            });
                        }
                    }
                });

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
      window.location.reload();
    }

    function btnSolicitarAdopcion7(idA) {
        console.log("funcion adoptar");
        localStorage.setItem("idMascotaForSolicitarAdopcion",idA);
        console.log(localStorage.getItem("idMascotaForSolicitarAdopcion"));
        window.location= 'adoptar.html'; 
    }

function volver999() {
  if (localStorage.getItem("valorBotonVolver")=="perro") {
      window.location= 'Catalogo_dogs.html';     
  } else if (localStorage.getItem("valorBotonVolver")=="gato"){
    window.location= 'Catalogo_cats.html';
  } else {
    window.location= 'index.html';
  }
}
