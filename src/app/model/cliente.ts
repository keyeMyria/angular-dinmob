export class Cliente {


    id_cliente?: number;
    persona_moral?: string;
    nombre_persona_fisica?: string;
    nacionalidad_persona_fisica?: string;
    lugar_nacimiento_persona_fisica?: string;
    fecha_nacimiento_persona_fisica?: string;
    pais_nacimiento_persona_fisica?: string;
    lugar_residencia_persona_fisica?: string;
    domicilio_persona_fisica?: string;
    cp_persona_fisica?: string;
    ciudad_persona_fisica?: string;
    telefono_persona_fisica?: string;
    celular_persona_fisica?: string;
    email_persona_fisica?: string;
    identificacion_oficial_persona_fisica?: string;
    num_identificacion_persona_fisica?: string;
    rfc_persona_fisica?: string;
    curp_persona_fisica?: string;
    estado_civil_persona_fisica?: string;
    regimen_conyugal_persona_fisica?: string;
    df_calle_persona_fisica100?: string;
    df_num_interior_persona_fisica?: string;
    df_num_exterior_persona_fisica?: string;
    df_cp_persona_fisica?: string;
    df_localidad_persona_fisica?: string;
    df_municipio_persona_fisica?: string;
    df_estado_persona_fisica?: string;
    df_colonia_persona_fisica?: string;
    razon_social_persona_moral?: string;
    nacionalidad_persona_moral?: string;
    fecha_constitucion_persona_moral?: string;
    actividad_persona_moral?: string;
    telefono_persona_moral?: string;
    email_persona_moral?: string;
    rfc_persona_moral?: string;
    apoderado_legal_persona_moral?: string;
    instrumento_publico_persona_moral?: string;
    poderes_representante_persona_moral?: string;
    df_calle_persona_moral?: string;
    df_num_interior_persona_moral?: string;
    df_num_exterior_persona_moral?: string;
    df_cp_persona_moral?: string;
    df_localidad_persona_moral?: string;
    df_municipio_persona_moral?: string;
    df_estado_persona_moral?: string;
    df_colonia_persona_moral?: string;
    profesion_laboral?: string;
    ocupacion_laboral?: string;
    empresa_laboral?: string;
    puesto_laboral?: string;
    jefe_inmediato_laboral?: string;
    giro_empresa_laboral?: string;
    domicilio_empresa_laboral?: string;
    cp_laboral?: string;
    ciudad_laboral?: string;
    telefono_laboral?: string;
    nombre_conyuge?: string;
    nacionalidad_conyuge?: string;
    lugar_nacimiento_conyuge?: string;
    fecha_nacimiento_conyuge?: string;
    pais_nacimiento_conyuge?: string;
    lugar_residencia_conyuge?: string;
    domicilio_conyuge?: string;
    cp_conyuge?: string;
    ciudad_conyuge?: string;
    telefono_conyuge?: string;
    celular_conyuge?: string;
    email_conyuge?: string;
    identificacion_oficial_conyuge?: string;
    rfc_conyuge?: string;
    curp_conyuge?: string;
    df_calle_conyuge?: string;
    df_num_interior_conyuge?: string;
    df_num_exterior_conyuge?: string;
    df_cp_conyuge?: string;
    df_localidad_conyuge?: string;
    df_municipio_conyuge?: string;
    df_estado_conyuge?: string;
    df_colonia_conyuge?: string;
    nombre_apoderado?: string;
    nacionalidad_apoderado?: string;
    lugar_nacimiento_apoderado?: string;
    fecha_nacimiento_apoderado?: string;
    pais_nacimiento_apoderado?: string;
    lugar_residencia_apoderado?: string;
    domicilio_apoderado?: string;
    cp_apoderado?: string;
    ciudad_apoderado?: string;
    telefono_apoderado?: string;
    celular_apoderado?: string;
    email_apoderado?: string;
    identificacion_oficial_apoderado?: string;
    num_identificacion_apoderado?: string;
    rfc_apoderado?: string;
    curp_apoderado?: string;
    file_comprobante_domicilio_cliente?: string;
    file_constancia_laboral_cliente?: string;
    file_curp_cliente?: string;
    file_identificacion_cliente?: string;
    file_acta_nacimiento_cliente?: string;
    file_rfc_cliente?: string;
    file_comprobante_domicilio_conyuge?: string;
    file_curp_conyuge?: string;
    file_identificacion_conyuge?: string;
    file_acta_nacimiento_conyuge?: string;
    file_rfc_conyuge?: string;
    file_acta_matrimonio_cliente?: string;
    file_cuenta_bancaria_cliente?: string;
    alerta_activada?: string;
    mensaje_alerta?: string;
    fecha_modificacion?: string;

    /* propiedad añadida */

    //nombre?: string;

    get nombre(): string {
        console.log("get nombre");
        if (this.persona_moral === '0') {
            return this.nombre_persona_fisica;
        } else {
            return this.razon_social_persona_moral;
        }

    }



    get rfc(): string {

            console.log("get rfc");
        if (this.persona_moral === '0') {
            return this.rfc_persona_fisica;
        } else {
            return this.rfc_persona_moral;
        }

    }

    constructor() {

    }


    public static copiar(cliente: Cliente): Cliente {
        let copia = new Cliente();

        return copia;
    }

}
