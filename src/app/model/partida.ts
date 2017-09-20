export class Partida {
  id_partida?:number;
  codigo?: number;
  nombre?:string;  

  public static copiar(partida:Partida):Partida{
    let copia = new Partida();

    copia.nombre = partida.nombre;    
    copia.id_partida = partida.id_partida;
    copia.codigo = partida.codigo;

    return copia;
}


}

