export class Usuario {
    
        id_usuario?: number;
        nombre: string;
        email: string;
        id_rol: number;
        rol?: string;
    
    
        constructor() { 
            this.id_rol=null;
        }
    
        public static copiar(usuario:Usuario):Usuario{
            let copia = new Usuario();
    
            copia.nombre = usuario.nombre;
            copia.email = usuario.email;
            copia.id_rol = usuario.id_rol;
    
            return copia;
        }
    
    
    
        public copiar(): Usuario {
            let copia = new Usuario();
    
            copia.nombre = this.nombre;
            copia.email = this.email;
            copia.id_rol = this.id_rol;
    
            return copia;
    
            
        }
    
    
    
    
    }
    