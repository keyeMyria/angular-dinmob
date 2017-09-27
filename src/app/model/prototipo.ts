export class Prototipo {
  id_prototipo?:number;
  nombre?:string;  
  fecha_creacion?:string;
  

  public static copiar(prototipo:Prototipo):Prototipo{
    let copia = new Prototipo();

    copia.nombre = prototipo.nombre;    
    copia.id_prototipo = prototipo.id_prototipo;

    return copia;
}


}

