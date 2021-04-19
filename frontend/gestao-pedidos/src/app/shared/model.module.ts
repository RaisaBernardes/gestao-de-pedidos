export class Usuario {
    nm_completo?: String;
    email: String;
    senha: String;
    /* ENDEREÇO PRINCIPAL DO USUARIO PARA O FORM */
    logradouro?: String;
    numero?: number;
    complemento?: String;
    bairro?: String;
    cidade?: String;
    estado?: String;
    //////////////////////////////////
    cd_tipo_usuario?: String;
}

export class Endereco {
    cd_endereco: number;
    cd_usuario: number;
    logradouro: String;
    numero: number;
    complemento: String;
    bairro: String;
    cidade: String;
    estado: String;
}

export class PedidoComanda {
    cd_user: number;
    status: String;
    hr_realizacao: Date;
    pagamento: Pagamento;
    pedidos: PedidoContem[];
}

export class Pedido {
    cd_pedido?: number;
    pagamento: Pagamento;
    pedidos: PedidoContem[];
}

export class Item {
    cd_item: number;
    descricao: String;
    ingredientes_descricao: String;
    preco: number;
    tipo_item: TipoItem;
}

export class TipoItem {
    cd_tipo_item: number;
    descricao: String;
}

export class Pagamento {
    forma_pagamento: FormaPagamento;
    vl_total: number;
}

export class FormaPagamento {
    cd_forma_pagamento: number;
    descricao: String;
}

// RELAÇÃO ITEM COM PEDIDO
export class PedidoContem {
    cd_item: number;
    quantidade: number;

    constructor(cd_item) {
        this.cd_item = cd_item;
        this.quantidade = 1;
    }
}
