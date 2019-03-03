        
        function comprobarRegistro(){            
            var leido = leerCookie("nombre");
            if (leido != ""){
                document.getElementById("desconocido").textContent = " " + leido;
                document.getElementById("btn-registro").style.visibility = "hidden";
                document.getElementById("btn-borrarCookies").style.visibility = "visible";
                alert("¡Bienvenid@ de nuevo " + leido + "!");
            }
        }
            
        function cambio(){
            //muestra el formulario si el cliente quiere registrarse
            let contenedor = document.getElementById("contenedorFormulario");
            contenedor.style.visibility = "visible";
        }
        
        function borrarCookies(){            
            alert("Sentimos verte marchar, ¡vuelve cuando quieras!");
            crearCookie("nombre", "", -1);
            location.reload();
        }

        function comprobarNombre(){
            var nombre = document.getElementById("nombre").value;
            if (nombre.split('').length >= 4){
                document.getElementById("nombreError").style.visibility = "hidden";
                return true;
            } else {
                document.getElementById("nombreError").style.visibility = "visible";
                return false;
            }
        }
 
        function comprobarEmail(){
            let email = document.getElementById("email").value;
            let posArroba=email.indexOf("@");
            let posPunto=email.indexOf(".",posArroba);
            if(posArroba!=-1&&posPunto!=-1&&((posPunto-posArroba)>2)){
            	document.getElementById("emailError").style.visibility="hidden";
            	return true;
            }else{
            	document.getElementById("emailError").style.visibility="visible";
            	return false;
            }
	}

        function comprobarPass(){
            let pass = document.getElementById("pass").value;
            //alert(pass);    //(?=.*\d) UN NUMERO  (?=.*[a-z]) UNA MIN (?=.*[A-Z]) UNA MAYÚSCULA  (?!.*\s)  NINGÚN ESPACIO: ?=. != ?!.  .{4,8}$ 4 A 8 CARACTERES
            let expresionR = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;           //* (/[!"£$\[\]{}%^&*:@\\~#';\/.,<>|¬`]/g)
            let resultado = expresionR.test(pass);
            if(resultado){
                document.getElementById("passError").style.visibility = "hidden";
                return true;
            } else {
                document.getElementById("passError").style.visibility = "visible";
                return false;
            }
        }
        
        function comprobarPass2(){
            let pass = document.getElementById("pass").value;
            let pass2 = document.getElementById("pass-2").value;
            
            if (pass == pass2){
                document.getElementById("pass2error").style.visibility = "hidden";
                return true;
            } else {
                document.getElementById("pass2error").style.visibility = "visible";
                return false;
            }
        }
        
	function comprobarOpcion(){
            // obtenemos todos los input radio del grupo horario que esten chequeados
            // si no hay ninguno mostramos error
            if(!document.querySelector('input[name="sexo"]:checked')){
                document.getElementById("sexoError").style.visibility = "visible";
                return false;
            } else {
                document.getElementById("sexoError").style.visibility = "hidden";
                return true;
            }
        }
        
        function comprobarPrivacidad(){
            // si no se han aceptado las cookies y la privacidad mostramos error
            if(!terminos.checked){
                document.getElementById("terminosError").style.visibility = "visible";
                return false;
            } else {
                document.getElementById("terminosError").style.visibility = "hidden";
                return true;
            }
        }

	function validar(){
            //realizar submit desde código
            if(comprobarNombre()&&comprobarEmail()&&comprobarPass()&&comprobarPass2()&&comprobarOpcion()&&comprobarPrivacidad()){     //
                //damos la bienvenida al usuario
                let nombre = document.getElementById("nombre").value;
                alert("¡Usuario " + nombre + " registrado!");
                //creamos cookie
                crearCookie("nombre",nombre,60);
                return true;
            }else{
                return false;
            }
        }        

        // Funciones para crear, leer y borrar cookies

        /*Función para crear/borrar cookies, a la que se le puede indicar los 
        días para que expire dicha cookie, y en caso de no hacerlo, la eliminará
        porque la creará con fecha anterior a la actual*/

        function crearCookie(name,valor,dias) {
            // Si se indica cuántos días ha de tardar en expirar la cookie
            if (dias){
                // Se almacena la fecha actual
                var date = new Date();
                // a la fecha almacenada se le añaden los días recibidos por la función
                date.setTime(date.getTime()+(dias*24*60*60*1000));
                // se almacena la cadena "; expires=" mas la fecha actual con los días añadidos
                var expirar = "; expires="+date.toGMTString();
            } else {
                // si no se le pasan días querrá decir que queremos borrarla cuando se cierre el navegador
                var expirar = "";
            }
            // Se crea/borra la nueva cookie, por ejemplo visita=1;expires=Tue, 12 Mar 2013 12:12:00 GMT; path=/ 
            document.cookie = name+"="+valor+expirar+"; path=/";
        }

        // Función para leer cookies creadas

        function leerCookie(name) {
            // Almacenamos el nombre de la cookie seguida del signo de igual
            var miNombre = name + "=";
            // Almacenamos en el array cadena todos los apartados de la cookie, ya que
            // cada uno de ellos va separado del otro por el signo de punto y coma
            var cadena = document.cookie.split(';');
            // Se recorre todos los elementos del array creado
            for(var i=0;i < cadena.length;i++) {
                // en 'c' se almacena el valor del elemento de índice 'i' 
                var c = cadena[i];
                // Se eliminan los caracteres en blanco iniciales
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                // Si se encuentra el contenido de 'miNombre' en el elemento del array leído
                // se devuelve el valor existente a continuación del símbolo igual
                if (c.indexOf(miNombre) == 0)
                    return c.substring(miNombre.length,c.length);
            }
            // Si llega aquí es que no existe la cookie y devuelve el valor 0
            return 0;
        }
