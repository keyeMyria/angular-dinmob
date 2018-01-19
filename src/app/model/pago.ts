export class Pago {

    fecha_programada?: string;
    fecha_pago?: string;
    monto?: string;
    tipo_pago?: string;
    forma_pago?: string;
    nota?: string;





    public static copiar(pago: Pago): Pago {
        let copia = new Pago();

        copia.fecha_programada = pago.fecha_programada;
        copia.fecha_pago = pago.fecha_pago;
        copia.monto = pago.monto;
        copia.tipo_pago = pago.tipo_pago;
        copia.forma_pago = pago.forma_pago;
        copia.nota = pago.nota;


        return copia;
    }




}

