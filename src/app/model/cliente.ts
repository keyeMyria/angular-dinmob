export class Cliente {
    
        id_cliente?: number;
        nombre: string
        email?: string;
        telefono?: string;
        contacto?: string;
        rfc?: string;
        calle_fiscal?: string;
        num_ext_fiscal?: string;
        num_int_fiscal?: string;
        colonia_fiscal?: string;
        cp_fiscal?: string;
        municipio_fiscal?: string;
        estado_fiscal?: string;
        calle_envio?: string;
        num_ext_envio?: string;
        num_int_envio?: string;
        colonia_envio?: string;
        cp_envio: string;
        municipio_envio?: string;
        estado_envio?: string;
    
        constructor() {
            this.nombre = null;
            //direccion fiscal
            this.calle_fiscal = null;
            this.num_ext_fiscal = null;
            this.num_int_fiscal = null;
            this.colonia_fiscal = null;
            this.cp_fiscal = null;
            this.municipio_fiscal = null;
            this.estado_fiscal = null;
            //direccion envio
            this.calle_envio = null;
            this.num_ext_envio = null;
            this.num_int_envio = null;
            this.colonia_envio = null;
            this.cp_envio = null;
            this.municipio_envio = null;
            this.estado_envio = null;
        }
    
    
    
        public static getDireccionFiscal(cliente: Cliente): string {
            if (cliente.id_cliente) {
                //return `CALLE: ${cliente.calle_fiscal} NÚMERO: ${cliente.num_ext_fiscal}`;
                return (cliente.calle_fiscal === null ? "" : cliente.calle_fiscal) + " " + (cliente.num_ext_fiscal === null ? "" : cliente.num_ext_fiscal) + " " + (cliente.num_int_fiscal === null ? "" : cliente.num_int_fiscal) + "\r" +
                    (cliente.colonia_fiscal === null ? "" : cliente.colonia_fiscal) + "\r" +
                    (cliente.municipio_fiscal === null ? "" : cliente.municipio_fiscal) + " " + (cliente.estado_fiscal === null ? "" : cliente.estado_fiscal) + "\r" +
                    (cliente.cp_fiscal === null ? "" : cliente.cp_fiscal);
            } else {
                return "";
            }
        }
    
        public static getDireccionEnvio(cliente: Cliente): string {
            if (cliente.id_cliente) {
                return (cliente.calle_envio === null ? "" : cliente.calle_envio) + " " + (cliente.num_ext_envio === null ? "" : cliente.num_ext_envio) + " " + (cliente.num_int_envio === null ? "" : cliente.num_int_envio) + "\r" +
                    (cliente.colonia_envio === null ? "" : cliente.colonia_envio) + "\r" +
                    (cliente.municipio_envio === null ? "" : cliente.municipio_envio) + " " + (cliente.estado_envio === null ? "" : cliente.estado_envio) + "\r" +
                    (cliente.cp_envio === null ? "" : cliente.cp_envio);
            } else {
                return "";
            }
        }
    
        public static copiar(cliente: Cliente): Cliente {
            let copia = new Cliente();
    
            copia.nombre = cliente.nombre;
            copia.email = cliente.email;
            copia.telefono = cliente.telefono;
            copia.contacto = cliente.contacto;
            copia.rfc = cliente.rfc;
            copia.calle_fiscal = cliente.calle_fiscal;
            copia.num_ext_fiscal = cliente.num_ext_fiscal;
            copia.num_int_fiscal = cliente.num_int_fiscal;
            copia.colonia_fiscal = cliente.colonia_fiscal;
            copia.cp_fiscal = cliente.cp_fiscal;
            copia.municipio_fiscal = cliente.municipio_fiscal;
            copia.estado_fiscal = cliente.estado_fiscal;
            copia.calle_envio = cliente.calle_envio;
            copia.num_ext_envio = cliente.num_ext_envio;
            copia.num_int_envio = cliente.num_int_envio;
            copia.colonia_envio = cliente.colonia_envio;
            copia.cp_envio = cliente.cp_envio;
            copia.municipio_envio = cliente.municipio_envio;
            copia.estado_envio = cliente.estado_envio;
    
    
    
    
            return copia;
        }
    
    }
    