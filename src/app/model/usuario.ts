export class Usuario {
    
        id_usuario?: number;
        nombre: string;
        email: string;
        id_tipo_usuario: number;
        tipo_usuario?: string;
    
    
        constructor() { 
            this.id_tipo_usuario=null;
        }
    
        public static copiar(usuario:Usuario):Usuario{
            let copia = new Usuario();
    
            copia.nombre = usuario.nombre;
            copia.email = usuario.email;
            copia.id_tipo_usuario = usuario.id_tipo_usuario;
    
            return copia;
        }
    
    
    
        public copiar(): Usuario {
            let copia = new Usuario();
    
            copia.nombre = this.nombre;
            copia.email = this.email;
            copia.id_tipo_usuario = this.id_tipo_usuario;
    
            return copia;
    
            
        }
    
    
    
    
    }
    