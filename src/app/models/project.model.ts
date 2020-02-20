// realizamos export para poder usarlo en otros archivos y corresponderá al modelo de mis projectos y definimos el modelo

export class ProjectModel {

    id: string;
    titulo: string;
    ubicacion: string;
    tipo: string;
    // indicaremos el estado de proyecto mediante booleano, asignando en curso a true
    estado: boolean;

    constructor() {
        this.estado = true;
    }

}