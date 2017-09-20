export class Insumo {
  cantidad?:string;  
  codigo?: number;
  id_insumo?:number;
  id_insumo_partida?:number;
  id_partida?:number;
  insumo?:string;  
  precio?:string;
  unidad?:string;

  public static copiar(insumo:Insumo):Insumo{
    let copia = new Insumo();

    copia.cantidad = insumo.cantidad;    
    copia.codigo = insumo.codigo;
    copia.id_insumo = insumo.id_insumo;
    copia.id_insumo_partida = insumo.id_insumo_partida;
    copia.id_partida = insumo.id_partida;
    copia.insumo = insumo.insumo;
    copia.precio = insumo.precio;
    copia.unidad = insumo.unidad;
   

    return copia;
}


}

