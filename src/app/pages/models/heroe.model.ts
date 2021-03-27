export class HeroeModel {

    id: string;
    nombre: string;
    poder: string;
    fecha_nac: string;
    img: string;
    vivo: boolean;

    constructor() {
        this.vivo = true;
    };

}