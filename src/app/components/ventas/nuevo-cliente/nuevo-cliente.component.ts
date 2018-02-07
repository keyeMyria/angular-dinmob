import { Component } from '@angular/core';
import { ClientesService } from "app/services/clientes.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ObrasService } from 'app/services/obras.service';


@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent {

  loading: boolean;
  manzanas: any = [];
  obras: any = [];

  public maskRFC = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i,]
  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i]
  public maskCP = [/\d/, /\d/, /\d/, /\d/, /\d/]
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public maskRFCM = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i,]
  form: FormGroup;
  formInmueble: FormGroup;

  constructor(
    public clienteSrv: ClientesService,
    private fb: FormBuilder,
    private obraSrv: ObrasService,
  ) {



    this.form = this.fb.group({
      //persona fisica
      persona_moral: ["0", Validators.required],
      nombre: [null, Validators.required],
      nacionalidad_persona_fisica: null,
      lugar_nacimiento_persona_fisica: null,
      fecha_nacimiento_persona_fisica: null,
      pais_nacimiento_persona_fisica: null,
      lugar_residencia_persona_fisica: null,
      domicilio_persona_fisica: null,
      cp_persona_fisica: null,
      ciudad_persona_fisica: null,
      telefono_persona_fisica: null,
      celular_persona_fisica: null,
      email_persona_fisica: null,
      identificacion_oficial_persona_fisica: null,
      num_identificacion_persona_fisica: null,
      rfc_persona_fisica: null,
      curp_persona_fisica: null,
      estado_civil_persona_fisica: "0",
      regimen_conyugal_persona_fisica: "0",
      df_calle_persona_fisica: null,
      df_num_exterior_persona_fisica: null,
      df_num_interior_persona_fisica: null,
      df_colonia_persona_fisica: null,
      df_cp_persona_fisica: null,
      df_localidad_persona_fisica: null,
      df_municipio_persona_fisica: null,
      df_estado_persona_fisica: null,

      //persona moral
      nacionalidad_persona_moral: null,
      fecha_constitucion_persona_moral: null,
      actividad_persona_moral: null,
      telefono_persona_moral: null,
      email_persona_moral: null,
      rfc_persona_moral: null,
      apoderado_legal_persona_moral: null,
      instrumento_publico_persona_moral: null,
      poderes_representante_persona_moral: null,
      df_calle_persona_moral: null,
      df_num_exterior_persona_moral: null,
      df_num_interior_persona_moral: null,
      df_colonia_persona_moral: null,
      df_cp_persona_moral: null,
      df_localidad_persona_moral: null,
      df_municipio_persona_moral: null,
      df_estado_persona_moral: null,


      //laborales
      profesion_laboral: null,
      ocupacion_laboral: null,
      empresa_laboral: null,
      puesto_laboral: null,
      jefe_inmediato_laboral: null,
      giro_empresa_laboral: null,
      domicilio_empresa_laboral: null,
      cp_laboral: null,
      ciudad_laboral: null,
      telefono_laboral: null,


      //conyuge
      nombre_conyuge: null,
      nacionalidad_conyuge: null,
      lugar_nacimiento_conyuge: null,
      fecha_nacimiento_conyuge: null,
      pais_nacimiento_conyuge: null,
      lugar_residencia_conyuge: null,
      domicilio_conyuge: null,
      cp_conyuge: null,
      ciudad_conyuge: null,
      telefono_conyuge: null,
      celular_conyuge: null,
      email_conyuge: null,
      identificacion_oficial_conyuge: null,
      rfc_conyuge: null,
      curp_conyuge: null,
      df_calle_conyuge: null,
      df_num_exterior_conyuge: null,
      df_num_interior_conyuge: null,
      df_colonia_conyuge: null,
      df_cp_conyuge: null,
      df_localidad_conyuge: null,
      df_municipio_conyuge: null,
      df_estado_conyuge: null,


      //apoderado
      nombre_apoderado: null,
      nacionalidad_apoderado: null,
      lugar_nacimiento_apoderado: null,
      fecha_nacimiento_apoderado: null,
      pais_nacimiento_apoderado: null,
      lugar_residencia_apoderado: null,
      domicilio_apoderado: null,
      cp_apoderado: null,
      ciudad_apoderado: null,
      telefono_apoderado: null,
      celular_apoderado: null,
      email_apoderado: null,
      identificacion_oficial_apoderado: null,
      num_identificacion_apoderado: null,
      rfc_apoderado: null,
      curp_apoderado: null,
    });

    this.formInmueble = this.fb.group({
      obra: ["", Validators.required],
      lote: ["", Validators.required]
    });

  }

  cargarObra(id_obra) {

    console.log("cargar obra", id_obra);

    if (id_obra) {
      this.loading = true;
      this.obraSrv.getLotesEnVentaLibres(id_obra)
        .subscribe(obra => {
          console.log("getLotes", obra.manzanas);
          this.manzanas = obra.manzanas;
          this.loading = false;
        }, (error) => {
          this.loading = false;
        });

    } else {
      this.manzanas = [];
    }

  }




  createCliente() {
    this.clienteSrv.createCliente(this.form.value)
      .subscribe(res => console.log("Cliente Creado", res));

  }



}
