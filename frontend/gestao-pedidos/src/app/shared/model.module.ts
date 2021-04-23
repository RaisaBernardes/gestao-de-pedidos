export class Usuario {
    nm_completo?: String;
    email: String;
    senha: String;
    telefone?: String;
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

/*export class Endereco {
    cdEndereco: number;
    cdUsuario: number;
    logradouro: String;
    numero: number;
    complemento: String;
    bairro: String;
    cidade: String;
    estado: String;
}*/

export class Pedido {
    cdPedido?: number;
    pagamento: Pagamento;
    //enderecoEntrega: Endereco;
    pedidos: PedidoContem[];
}

export class Item {
    cdItem: number;
    descricao: String;
    ingredientesDescricao: String;
    preco: number;
    itemTypeCdTipoItem: TipoItem;
}

export class TipoItem {
    cd_tipo_item: number;
    descricao: String;
}

export class Pagamento {
    formaPagamento: FormaPagamento;
    vlTotal: number;
}

export class FormaPagamento {
    cdFormaPagamento: number;
    descricao: String;
}

// RELAÇÃO ITEM COM PEDIDO
export class PedidoContem {
    itemCdItem: number;
    quantidade: number;

    constructor(itemCdItem) {
        this.itemCdItem = itemCdItem;
        this.quantidade = 1;
    }
}
