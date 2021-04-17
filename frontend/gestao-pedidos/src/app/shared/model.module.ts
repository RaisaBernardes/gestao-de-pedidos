export class Usuario {
    nm_completo?: String;
    email: String;
    senha: String;
    logradouro?: String;
    numero?: number;
    complemento?: String;
    bairro?: String;
    cidade?: String;
    estado?: String;
    cd_tipo_usuario?: String;
}

export class Pedido {
    cd_user: number;
    status: String;
    hr_realizacao: Date;
    valor_total: number;
    tipo_pagamento: String;
}

export class Item {
    cd_item: number;
    descricao: String;
    preco: number;
    tipo_item: String;
}

// RELAÇÃO ITEM COM PEDIDO
export class PedidoContem {
    cd_pedido: number;
    cd_item: number;
    quantidade: number;
}

export class StatusPedido {
    cd_status_pedido: number;
    descricao: String;
}
